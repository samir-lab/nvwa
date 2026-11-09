const compiler = require('vue-template-compiler')

/**
 * ast type define:
 * 1: ASTElement 
 * 2: ASTExpression 
 * 3: ASTText 
 */
export function pureAST(pureAst, ast, dataScope){
    pureAst.attrsList = ast.attrsList
    pureAst.attrsMap = ast.attrsMap
    pureAst.mockMap = {}
    if(dataScope){
        for(let key in pureAst.attrsMap){
            if((key.indexOf(":") == 0 || key == 'v-model') && pureAst.attrsMap[key]){
                pureAst.mockMap[pureAst.attrsMap[key]] = dataScope[pureAst.attrsMap[key]] || null
            }
        }
    }
    pureAst.tag = ast.tag
    pureAst.type = ast.type
    if(ast && ast.text){
        pureAst.text = ast.text
    }
    if(!pureAst.tag){
        pureAst.tag = 'text'
    }
    pureAst.children = []
    if(ast && ast.scopedSlots && ast.scopedSlots['"default"']){
        pureAst.children.push(pureAST({}, ast.scopedSlots['"default"']))
    }
    if(ast && ast.children){
        ast.children.forEach(c => {
            if(c.type == 3 && c.text && c.text.trim() == ''){
                return
            }
            pureAst.children.push(pureAST({}, c, dataScope))
        });
    }
    return pureAst
}

export function parseASTFromXmlStr(template, dataScope) {
    let pureAst = {}
    try { //Firefox, Mozilla, Opera, etc.
        let result = compiler.compile(template,{})
        if(result.ast){
            //console.log(result.ast)
            pureAST(pureAst, result.ast, dataScope)
            //console.log(pureAst)
            return pureAst
        } else {
            console.error(result.errors)
        }
    } catch(e) {
        console.error(e)
    }
}


export function buildAttrs(attrsMap, customAttrs, dataScope, mockMap, methodsScope){
    let attrs = ''
    if(attrsMap){
        for(let key in attrsMap){
            if(attrsMap[key]){
                attrs += ` ${key}="${attrsMap[key]}" `
                if(key.indexOf(':') == 0 && !(attrsMap[key] == true || attrsMap[key] == 'true' || attrsMap[key] == false || attrsMap[key] == 'false') && isNaN(attrsMap[key])){
                    if(attrsMap[key].indexOf('scope.') < 0){
                        dataScope[attrsMap[key]] = mockMap && mockMap[attrsMap[key]] ? mockMap[attrsMap[key]] : null
                    }
                }
                if(key == 'v-model'){
                    if(attrsMap[key].indexOf('.') == -1){
                        dataScope[attrsMap[key]] = mockMap && mockMap[attrsMap[key]] ? mockMap[attrsMap[key]] : null
                    } else {
                        let prefixModel = attrsMap[key].substring(0,attrsMap[key].indexOf('.'));
                        dataScope[prefixModel] = mockMap && mockMap[prefixModel] ? mockMap[prefixModel] : {}
                    }
                }
                if(key.indexOf('@') == 0){
                    //TODO 如何支持组件的默认参数
                    methodsScope[attrsMap[key]] = `function(){}`
                }
            }
        }
    }
    if(customAttrs){
        customAttrs.forEach(e => {
            if(e.key && e.value){
                attrs += ` ${e.key}="${e.value}" `
            }
        })
    }
    return attrs
}


export function buildContent(root, dataScope, methodsScope){
    let content = ''
    if(root.tag == 'text'){
        content += root.text || ''
        if(root.textBindVar){
            dataScope[root.textBindVar] = root.textMockVal || null
        }
        return content
    }
    content += `<${root.tag}` + buildAttrs(root.attrsMap, root.customAttrs, dataScope, root.mockMap, methodsScope) + `>`
    if(root.children && root.children.length > 0){
        root.children.forEach(item => {
            content += buildContent(item, dataScope, methodsScope)
        })
    }
    content += `</${root.tag}>`
    return content;
}


export function parseComponentFromAST(contextAst){
    let data = {}
    data.ast = contextAst
    data.dataScope = {}
    data.methodsScope = {}
    data.content = buildContent(contextAst, data.dataScope, data.methodsScope)
    return data;
}



/**
 * 节点中下一个ID
 * @param {node} data 
 */
export function nextId(data){
    let id = data.id
    if(data.children && data.children.length > 0){
        data.children.forEach(e => {
            let cid = nextId(e)
            if(cid > id){
                id = cid
            }
        });
    }
    return id;
}

export function buildDistAst(dist, ast, index){
    index = index + 1
    dist.id = index
    dist.label = ast.tag
    dist.tag = ast.tag
    dist.type = ast.type
    dist.attrsList = ast.attrsList
    dist.attrsMap = ast.attrsMap
    dist.customAttrs = ast.customAttrs
    dist.mockMap = ast.mockMap
    dist['x-css'] = ast['x-css']
    dist['x-props'] = ast['x-props']
    if(ast.text){
        dist.text = ast.text
        dist.textBindVar = ast.textBindVar
        dist.textMockVal = ast.textMockVal
        if(!dist.label){
            dist.label = dist.text
        }
    }
    if(ast && ast.children){
        dist.children = []
        ast.children.forEach(c => {
            if(c.type == 3 && c.text && c.text.trim() == ''){
                return
            }
            let temp = buildDistAst({}, c, index)
            index = temp.index
            dist.children.push(temp.dist)
        });
    }
    return {'dist':dist, 'index':index }
}


