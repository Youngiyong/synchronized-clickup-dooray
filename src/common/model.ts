

// projectId with ListId pair
export const pareDoorayProjectByClickupList = {
	"2531758068456824356": "123", // 이슈&요청
	"2978225050341435736": "123", // 배표
	"3078238647380653693": "123"	//자동화 테스트
}

export const pareDoorayWorkFlowByClickupList = {

}

export const pareDoorayMemberByClickupList = {

	
}




 /* hightest, high, normal, low, lowest, none */
export const pareDoorayPriorityClickupList = {

}

export const pareDoorayTagByClickupList = {

}


export const DoorayTagList = {

}

export const findListByPriorityrId = (priorityId: any) => {
	for (let [key, value] of Object.entries(pareDoorayPriorityClickupList)) {
		if (priorityId == key) {
			return value;
		} else if (priorityId == value){
			return key;
		}
	}
}


export const findListByMemberId = (memberId: string) => {
	for (let [key, value] of Object.entries(pareDoorayMemberByClickupList)) {
		if (memberId == key) {
			return value;
		} else if (memberId == value){
			return key;
		}
	}
}

export const isJson = (str: string) => {
	try {
		var json = JSON.parse(str);
		return (typeof json =='object')
	} catch (e){
		return false
	}
}


export const findListByTagId = (tagId: string) => {
	for (let [key, value] of Object.entries(pareDoorayTagByClickupList)) {
		if (tagId == key) {
			return value;
		} else if (tagId == value){
			return key;
		}
	}
}

export const findListByProjectId = (projectId: string) => {
	for (let [key, value] of Object.entries(pareDoorayProjectByClickupList)) {
		if (projectId == key) {
			return value;
		} else if (projectId == value){
			return key;
		}
	}
}

export const findListByWorkFlowId = (workFlowId: string) => {
	for (let [key, value] of Object.entries(pareDoorayWorkFlowByClickupList)) {
		if (workFlowId === key) {
			return value;
		} else if (workFlowId == value){
			return key;
		}
	}
}


export const findProjectIdByListId = (listId: string) => {
	return Object.values(pareDoorayProjectByClickupList).find(key => pareDoorayProjectByClickupList[key] === listId);
}


export const sleep = async (ms: number) =>{
	return await new Promise((resolve) => {
		setTimeout(resolve, ms);
	  });
}
