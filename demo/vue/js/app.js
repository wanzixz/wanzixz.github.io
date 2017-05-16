var list = [
{
    title: '吃饭打豆豆',
    isChecked:false
}, {
    title: '吃饭打豆豆',
    isChecked:true
}
];

new Vue({
	el:".main",
	data:{
		list:list,
		todo:''
	},
	methods:{

		//事件处理行数中的this指向的是，当前这个根实例
		addTodo(ev){ //添加任务
			this.list.push({
				title:this.todo,
				isChecked:false
			});
		},
		deleteTodo(todo){
			console.log(todo);
			var index = this.list.indexOf(todo);
			this.list.splice(index,1);
		}

	}
})