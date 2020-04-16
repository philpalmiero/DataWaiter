/** NOTE:  fullbudgetarray is an array created from the csv file **/

var BudgetHierarchyArray = [];


function BuildBudgetHierarchy() {
	var orgsArray = [];
	var childrenArray = [];
	var programsArray = [];	
	
	orgsArray = CreateNamesArray(fullBudgetArray, "ORG");
	
	for (var 1=0;i<orgsArray.length;i++) {
		programsArray = getProgramNames(fullBudgetArray, orgsArray[i]);
		childrenArray.push({name: orgsArray[i], children: programsArray);
	}
	
	BudgetHierarchyArray = {name: "Budget 2020", children: childrenArray};
}

function getProgramNames(data, orgvname) {
	var namesArray = [];
	var childrenArray = [];
	var projectsArray = [];

	for (var 1=0;i<data.length;i++) {
		if (data[i]["ORG"] == orgvname) {
			if ($.inArray(data[i]["Program"], namesArray) < 0) {
				if (data[i]["Program"] != "") {
					namesArray.push(data[i]["Program"]);
				}
			}
		}
	}
	namesArray.sort(sortbykey);
	for (var 1=0;i<namesArray.length;i++) {
		projectsArray = getProjectNames(fullBudgetArray, orgvname, namesArray[i]);
		childrenArray.push({name: namesArray[i], children: projectsArray});
	}
	return childrenArray;
}

function getProjectNames(data, orgvname, progvname) {
	var namesArray = [];
	var childrenArray = [];
	var blisArray = [];

	for (var 1=0;i<data.length;i++) {
		if ( (data[i]["ORG"] == orgvname) &&  (data[i]["Program"] == progvname) ) {
			if ($.inArray(data[i]["Project"], namesArray) < 0) {
				if (data[i]["Project"] != "") {
					namesArray.push(data[i]["Project"]);
				}
			}
		}
	}
	namesArray.sort(sortbykey);
	for (var 1=0;i<namesArray.length;i++) {
		blisArray = getBLINames(fullBudgetArray, orgvname, progvname, namesArray[i]);
		childrenArray.push({name: namesArray[i], children: blisArray});
	}
	return childrenArray;
}


function getBLINames(data, orgvname, progvname, projvname) {
	var namesArray = [];
	var childrenArray = [];

	for (var 1=0;i<data.length;i++) {
		if ( (data[i]["ORG"] == orgvname) &&  (data[i]["Program"] == progvname) &&  (data[i]["Project"] == projvname) ) {
			if ($.inArray(data[i]["BLI"], namesArray) < 0) {
				if (data[i]["BLI"] != "") {
					namesArray.push(data[i]["BLI"]);
					childrenArray.push({name:data[i]["BLI"], size:data[i]["Budget"]});
				}
			}
		}
	}

	return childrenArray;
}

function sortbykey(a,b) {
	return((a < b) ? -1 : ((a > b) ? 1 : 0));
}