var data = [
	{
		"no":1,
		"task":"task1",
		"status":"checked",
	},
	{
		"no":2,
		"task":"task2",
		"status":"",
	},
	{
		"no":3,
		"task":"task3",
		"status":"checked",
	},
	{
		"no":4,
		"task":"task4",
		"status":"",
	}
]

function dataTable(data){
	// if(data.length > pageLength){
	// 	data = data.slice(0, pageLength)
	// }
	document.getElementById("todo-table-body").innerHTML = "";
	for(var i in data){
		console.log(data[i])
		document.getElementById("todo-table-body").innerHTML += "<tr><td>"+data[i].no+"</td>"+
		"<td><span class='task-text'>"+data[i].task+"</span></td><td><input type='checkbox' "+data[i].status+"></td><td><button id="+data[i].no+" class='btn btn-info edit-btn'>Edit</button><button id="+data[i].no+" class='btn btn-info sub-btn' style='display:none'>Submit</button><button id="+data[i].no+" class='btn btn-warning delete-btn'>Delete</button></td></tr>"
	}

	$(".delete-btn").on('click',function(){
		var id = $(this).attr('id');

		var index = _.findIndex(data, function(o) {
			return o.no == id; 
		});
		data.splice(index, 1);
		dataTable(data)
	});
	$(".edit-btn").on('click',function(){
		var id = $(this).attr('id');
		var span = $(this).parents('tr').find('.task-text')
		var text = span.text();
		span.replaceWith('<input type="text" name="" class="form-control text-input" value='+text+'>')
		$(this).hide();
		$(this).siblings('button.sub-btn').show()
	});

	$(".sub-btn").on('click',function(){
		var id = $(this).attr('id');
		var textInput = $(this).parents('tr').find('.text-input')
		var val = textInput.val();
		textInput.replaceWith('<span class="task-text">'+val+'</span>')
		$(this).hide();
		$(this).siblings('button.edit-btn').show()
	})
}
dataTable(data)

$("#add-btn").on('click',function(){
	console.log($(".add-input").val())
	var addObj = {}
	addObj.no = data.length + 1;
	addObj.task = $(".add-input").val();
	addObj.status = "";

	data.push(addObj)
	$(".add-input").val('')
	dataTable(data)
})

