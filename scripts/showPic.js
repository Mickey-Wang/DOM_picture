//保证在执行prepareGallery这个函数之前已经生成一个完整的DOM对象
addLoadEvent(prepareGallery);

//添加页面加载完成之后的执行函数
function addLoadEvent(func) {
	var oldonload = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	}else{
		window.onload = function () {
			oldonload();
			func();
		};
	}
}

//把一个节点动态的插入到另一个节点之后
function insertAfter (newElement,targetElement) {
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

//编写一个适用于老浏览器的getElementsByClassName()函数
function getElementsByClassName (node , className) {
	if(node.getElementsByClassName()){
		//如果浏览器支持，那么使用现有的方法
		return node.getElementsByClassName(className);
	}else{
		var results = new Array();
		var elems = node.getElementsByTagName("*");
		for(var i = 0, length1 = elems.length; i < length1; i++){
			if (elems[i].className.indexOf(className) != -1) {
				results[results.length] = elems[i];
			}
		}
		return results;
	}
}


//给link绑定onclick事件
function prepareGallery() {
	//对象检测(object detection)保证向后兼容
	//普遍适用性的测试
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	//针对性的预防测试
	//把HTML文档的内容与JavaScript行为分离的原则：
	//	如果想用JavaScript给某个网页添加一些行为，就不应该让JavaScript代码对这个网页的内容结构有任何的依赖。
	if (!document.getElementById('imagegallery')) return false;
	var gallery = document.getElementById('imagegallery');
	var links = gallery.getElementsByTagName('a');
	for (var i = links.length - 1; i >= 0; i--) {
		links[i].onclick = function() {
/*			showPic(this);
			return false;
*/			return !showPic(this);
		};
	}
}

//不要做过多的假设
//改进后的showPic()不再假设文档里存在placeholder和description这两个元素节点，即使没有他们也不会发生任何错误。
//如果没有placeholder或description，那么一定会执行之后的return false;这样就永远无法跳转href属性内的链接。
//其实，是否要返回一个false值以取消链接的默认行为，应该由showPic函数来决定。
//showPic()有两个值：
//	如果图片切换成功，返回true
//	如果图片切换失败，返回false
//这样如果没有description这个标签，那么依然可以切换图片
//如果没有placeholder这个标签，依然可以跳转页面
function showPic(whichpic) {
	//以下四行是主要功能，需要硬性检查
	if(!document.getElementById('placeholder')) return false;
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById('placeholder');
	placeholder.setAttribute("src", source);
	//以下代码属于次要功能，也就是说description这个标签是可选的
	if(document.getElementById('description')){
		var text = whichpic.getAttribute("title");
		var description = document.getElementById('description');
		description.firstChild.nodeValue = text;
	}
	return true;
}

