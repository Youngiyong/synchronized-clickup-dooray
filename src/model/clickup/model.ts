import axios, { AxiosInstance, AxiosResponse } from 'axios';

// workflow clickup to dooray
// clickup event(automation) -> webhook(clickup format) -> lambda -> request to dooray api
export type IWebhookFromClickup = {
	webhook_id?: string,
	event?: string,
	task_id?: string,
	history_items?: []
}


// 클릭업 요청 Task Comment Interface
export type IRequestClickupCreateTaskComment = {
  comment_text?: string,
  assignee?: string,
  notify_all?: boolean
}

// 클릭업 요청 Task Interface
export type IRequestClickupCreateTask = {
	name?: string,
	description?: string,
	assignees?: [ string ],
	tags?: any,
	status?: string,
	priority?: string,
	due_date?: number,
	due_date_time?: boolean,
	time_estimate?: number,
	start_date?: number,
	start_date_time?: number,
	notify_all?: number,
	parent?: null | number,
	links_to?: null | number,
	check_required_custom_fields?: boolean,
	custom_fields?: [ 
		// {
		// 	id: 0a52c486-5f05-403b-b4fd-c512ff05131c,
		// 	value: 23
		// },
		// {
		// 	id: 03efda77-c7a0-42d3-8afd-fd546353c2f5,
		// 	value: Text field input
		// }
	]

}

export type IResponseClickUpTask = {
	id: string,
	name: string,
	text_content?: string,
	description?: string,
	status?: {},
	creator?: {},
	team_id?: string,
	url?: string,
	list?: {},
	project?: {},
	folder?: {},
	space?: {},
	attachments?:[]
}


export const requestClickupGetWebHook = async() => {
	const url = `https://api.clickup.com/api/v2/team/1234/webhook`
	return await axios.get(url, {
		headers: {
			"Authorization": process.env.CLICKUP_API_KEY,
			"Content-Type": "application/json"
		}
	});
}

export const requestClickupCreateWebHook = async() => {
	const url = `https://api.clickup.com/api/v2/team/1234/webhook`
	const param = {
		"endpoint": "https://aws/prod/clickup2dooray/sync-task",
		"events": [
		  "taskCreated",
		  "taskUpdated",
		  "taskDeleted"
		]
	  }
	return await axios.post(url, param, {
		headers: {
			"Authorization": process.env.CLICKUP_API_KEY,
			"Content-Type": "application/json"
		},
	}).catch((err)=>{
		console.log(err)
	})
}

export const requestClickupUpdateWebHook = async() => {
	const url = `https://api.clickup.com/api/v2/webhook/58448727-9850-4c97-8`
	const param = {
		"endpoint": "https://aws/prod/clickup2dooray/sync-task",
		"events": [
			"taskCreated",
			"taskUpdated",
			"taskStatusUpdated",
			"taskCommentPosted",
			"taskAssigneeUpdated"
		],
		"status": "active"
	  }
	return await axios.put(url, param, {
		headers: {
			"Authorization": process.env.CLICKUP_API_KEY,
			"Content-Type": "application/json"
		},
	}).catch((err)=>{
		console.log(err)
	})
}


export const requestClickupListMember = async(listNumber: string) => {
	const url = `https://api.clickup.com/api/v2/list/${listNumber}/member`
	return await axios.get(url, {
		headers: {
			"Authorization": process.env.CLICKUP_API_KEY,
			"Content-Type": "application/json"
		}
	}).catch((err) =>{
		console.log(err)
	});
}

export const requestClickupGetTasks = async(projectId: string) => {
	const url = `https://app.clickup.com/api/v2/list/${projectId}/task`
	return await axios.get(url, {
		headers: {
			"Authorization": process.env.CLICKUP_API_KEY,
			"Content-Type": "application/json"
		}
	}).catch((err) =>{
		console.log(err)
	});
}

export const requestClickupGetTaskComments = async(taskId: string) => {
	const url = `https://app.clickup.com/api/v2/task/${taskId}/comment`
	return await axios.get(url, {
		headers: {
			"Authorization": process.env.CLICKUP_API_KEY,
			"Content-Type": "application/json"
		}
	}).catch((err) =>{
		console.log(err)
	});
}

// https://api.clickup.com/api/v2/task/task_id/comment?custom_task_ids=&team_id=
export const requestClickupToCreateTaskComment = async(taskId: string, param: IRequestClickupCreateTaskComment) => {
	const url = `https://app.clickup.com/api/v2/task/${taskId}/comment`;
	return await axios.post(url, param, {
		headers: {
			"Authorization": process.env.CLICKUP_API_KEY,
			"Content-Type": "application/json"
		},
	}).catch((err)=>{
		console.log(err)
	});
}


export const requestClickupToUpdateTask = async (taskId: string, param: IRequestClickupCreateTask) => {
	const url = `https://app.clickup.com/api/v2/task/${taskId}}`;
	return await axios.put(url, param, {
		headers: {
			"Authorization": process.env.CLICKUP_API_KEY,
			"Content-Type": "application/json"
		},
	}).catch((err)=>{
		console.log(err)
	});
}


export const requestClickupToUpdateCustoFieldTask = async (taskId: string, param: IRequestClickupCreateTask) => {
	const url = `https://app.clickup.com/api/v2/task/${taskId}/?custom_task_ids=true&team_id=1234`;
	return await axios.put(url, param, {
		headers: {
			"Authorization": process.env.CLICKUP_API_KEY,
			"Content-Type": "application/json"
		},
	}).catch((err)=>{
		console.log(err)
	});
}


export const requestClickupToCreateTask = async (listNumber: string, param: IRequestClickupCreateTask) => {
	const url = `https://app.clickup.com/api/v2/list/${listNumber}/task`;
	return await axios.post(url, param, {
		headers: {
			"Authorization": process.env.CLICKUP_API_KEY,
			"Content-Type": "application/json"
		},
	}).catch((err)=>{
		console.log(err)
	});
}

export const requestClickupToDeleteTask = async (taskId: string) => {
	const url = `https://app.clickup.com/api/v2/task/${taskId}`;
	return await axios.delete(url, {
		headers: {
			"Authorization": process.env.CLICKUP_API_KEY,
			"Content-Type": "application/json"
		},
	}).catch((err)=>{
		console.log(err)
	});
}

export const requestClickupGetTask = async(taskId: string) => {
	const url = `https://api.clickup.com/api/v2/task/${taskId}?include_subtasks=true`
	return await axios.get(url, {
		headers: {
			"Authorization": process.env.CLICKUP_API_KEY,
			"Content-Type": "application/json"
		}
	});
}


export const getClickupAuthorizationCode = async () => {
	// https://app.clickup.com/api?client_id={client_id}&redirect_uri={redirect_uri}

	const url = "https://app.clickup.com/api/?client_id=" + process.env.CLICKUP_CLIENT_ID + "&redirect_uri=http://localhost:3000/dev/dooray2clickup/create-task";

	return await axios.get(url);
}

export const getClickupAccessToken = async (code) => {

	const url = "https://app.clickup.com/api/v2/oauth/token?client_id=" + process.env.CLICKUP_CLIENT_ID + "&client_secret=" + process.env.CLICKUP_SECRET_KEY + "&code=" + code;
	return await axios.post(url);
}


export const getClickupTeam = async () => {

	const url = "https://api.clickup.com/api/v2/team";
	return await axios.get(url, {
		headers: {
			"Authorization": "pk_5987505_8WELHANRBTXI2WH36HE4PL4TSS2QHMWH",
			"Content-Type": "application/json"
		},
	});
}


export const getClickupComment = (clickupWebhook: IWebhookFromClickup) => {
	const commentData = clickupWebhook.history_items[0].comment.comment
	const user = clickupWebhook.history_items[0].comment.user
	let comment = ""
	for(let obj of commentData){
		if(obj.attachment){
			comment += obj.attachment.url + "\n"  + "FileName: " + obj.attachment.title
		} else{
			comment += "\n" + obj.text + "\n"
		}
	}
	comment += "\n From Clickup" 
	return comment
}


export const getClickupTaskId = (doorayWebhook: IWebhookFromDooray, clickupTasks: any) => {
	let dooraySubject = doorayWebhook.post.subject.replace(/ /gi, "")

	for(let obj of clickupTasks.data.tasks){
		if(dooraySubject==obj.name.replace(/ /gi, "")){
			return obj.id
		}
	}
}


export const getAssignees = (clickupTask: any) => {

	let list = []
	let assignees = clickupTask.data.assignees
	for (let obj of assignees){
		let member = {                                    /* 업무 담당자 목록 */
			type: "member",
			member: {
				organizationMemberId: ""
			}
		} 
		member.member.organizationMemberId = findListByMemberId(obj.id.toString())

		list.push(member)
	}

	if(list){
		return list
	}
}



export const clickupSyncTask = (clickupWebhook: IWebhookFromClickup) => {
	
	switch(clickupWebhook.event){
		case "taskCreated":
			break
		case "taskUpdated":
			break
	}
}