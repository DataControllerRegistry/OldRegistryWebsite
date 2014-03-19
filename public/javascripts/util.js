$(function() {
	$(".pop-over").popover();
});

$(document).ready(function(){
	$(".purpose").click(
			function() {
				if ($(this).find("span").hasClass('glyphicon-plus')) {
					$(".purpose span").removeClass("glyphicon-minus").addClass(
							"glyphicon-plus");
					$(this).find("span").removeClass("glyphicon-plus").addClass(
							"glyphicon-minus");
				} else {
					$(this).find("span").removeClass("glyphicon-minus").addClass(
							"glyphicon-plus");
				}
			});
	
	$(".inner-panel").click(
			function() {
				var id= this.id;
				switch(id){
				case "dataClass-panel":
					makePanelChart("dataClasses");
					break;
				case "sensitiveData-panel":
					makePanelChart("sensitiveData");
					break;
				case "dataSubject-panel":
					makePanelChart("dataSubjects");
					break;
				case "dataDisclosee-panel":
					makePanelChart("dataDisclosees");
				
				}
			});
	
	$(".stat-object").click(
			function(){
				if($(this).hasClass('dataClass-item')){
					makeItemChart("dataClass",this.id);
				}else if($(this).hasClass('sensitiveData-item')){
					makeItemChart("sensitiveData",this.id);
				}else if($(this).hasClass('dataSubject-item')){
					makeItemChart("dataSubject",this.id);
				}else if($(this).hasClass('dataDisclosee-item')){
					makeItemChart("dataDisclosee",this.id);
				}
			});

});


var makePanelChart = function(element){
	var elementID = "#"+element;
	var graph;
	
	var median = parseInt($(elementID+"-median").text());
	var size = parseInt($(elementID+"-size").text());
	var natMed = parseInt($(elementID+"-natMed").text());
	
	var label1 = "(not set)";
	var label2 = "Overall Median";
	var label3 = "Median for this nature of work";
	
	switch(element){
	case "dataClasses":
		graph = "left-graph";
		$("#left-heading").empty().append("<h4>Data Classes Count Comparison</h4>");
		label1 = "Number of data classes collected";
		break;
	case "sensitiveData":
		graph = "left-graph";
		$("#left-heading").empty().append("<h4>Sensitive Data Count Comparison</h4>");
		label1 = "Number of sensitive data classes collected";
		break
	case "dataSubjects":
		graph="middle-graph";
		$("#middle-heading").empty().append("<h4>Data Subjects Count Comparison</h4>");
		label1 = "Number of data subjects collected information from";
		break;
	case "dataDisclosees":
		graph="right-graph";
		$("#right-heading").empty().append("<h4>Data Disclosees Count Comparison</h4>");
		label1 = "Number of data disclosees information shared with";
		break;
	}
	
	clearPanel(graph);
	
	Morris.Bar({
		element:graph,
		data:[
		 {y:'',n:size,x:median,z:natMed}     
		],
		xkey:'y',
		ykeys:['n','x','z'],
		labels:[label1,label2,label3],
		hideHover:'auto'
	})
}

var makeItemChart = function(type,id){
	console.log(type);
	var count = parseInt($("#count").text());
	var number = parseInt($("#"+type+"-"+id).text());
	var item=$("#"+id).text();
	console.log(item);
	var diff = count - number;
	var label1,label2;
	label1="Controllers which collect";
	label2="Controllers which don't";
	var graph;
	switch(type){
	case "dataClass":
		graph="left-graph";	
		var link=$("#lala").attr('href');
		 $("#left-heading").empty().append("<h4>Popularity of Data Class ("+item+")</h4><p>This shows how many controllers collect this data class and how many don't</p>");
		 break;
	case "sensitiveData":
		graph="left-graph";
		$("#left-heading").empty().append("<h4>Popularity of Sensitive Data Class ("+item+")</h4><p>This shows how many controllers collect this data class and how many don't</p>");
		break;
	case "dataSubject":
		graph="middle-graph";
		$("#middle-heading").empty().append("<h4>Popularity of Sensitive Data Subject ("+item+")</h4><p>This shows how many controllers collect this information from this data subject and how many don't</p>");
		break;
	case "dataDisclosee":
		graph="right-graph";
		$("#right-heading").empty().append("<h4>Popularity of Data Disclosee ("+item+")</h4><p>This shows how many controllers share information with this data disclosee and how many don't</p>");
		label1="Controllers which share";
		label2="Controllers which don't";
		break;	 
	}
	
	clearPanel(graph);
	
	Morris.Donut({
		  element: graph,
		  data: [
		    {label: label1, value: number},
		    {label: label2, value: diff}
		  ]
		});
	
}



var clearAllCharts = function(){
	$(".graph svg").remove();
	$(".graph-heading").empty();
}

var clearPanel = function(panel){
	$("#"+panel + " svg").remove();
	$("#"+panel + " .morris-hover").remove();
}

