var list = [
{
    title: '吃饭打豆豆',
    isChecked:false //状态为false的时候，表示任务未完成
}, {
    title: '吃饭打豆豆',
    isChecked:true //为true的时候，表示任务完成
}
];

new Vue({
	el:".main",
	data:{
		list:list,
		todo:'',
		edtorTodos:'', //记录是否为编辑状态
		beforTitle:'', //记录编辑之前的数据
	},
	computed:{
		noChecked(){
				return this.list.filter(function(item){
            return !item.isChecked
        }).length
		}
	},
	methods:{
		//事件处理行数中的this指向的是，当前这个根实例
		addTodo(ev){ //添加任务
			this.list.push({
				title:this.todo,
				isChecked:false,
				edtorTodos:'' //记录是否为编辑状态
			});
		},
		deleteTodo(todo){ //删除任务
			var index = this.list.indexOf(todo);
			this.list.splice(index,1);
		},
		edtorTodo(todo){ //编辑任务
			//在编辑任务之前先记录一下，input里面的数据，方便取消任务的时候保存数据
			this.beforTitle = todo.title;
			this.edtorTodos = todo;
		},
		edtorTodoed(){ //编辑任务成功
			this.edtorTodos = '';
		},
		cancelTodo(todo){ //取消编辑
			//把之前保存的数据赋值给它
			todo.title = this.beforTitle;
			//取消完成之后隐藏输入框
			this.edtorTodos = '';
		}

	},
	directives:{
		focus:{
			update(el,binding){
				//console.log(el,binding)
				if(binding.value){
					el.focus();
				}
			}
		}
	}

})