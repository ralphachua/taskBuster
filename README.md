# API Specifications

## GET /users/:user_id
Endpoint for retrieving user details

**Response**
```javascript
// HTTP status code: 200
{
	status: “success”,
	data: {
		name: “Fountain”,
		gender: “male”,
		avatarUrl: "/avatar/abc",
		level:  {
			name: “level 2”,
			currentPoints: 30,
			requiredPoints: 50
		},
		activeBadge: {
			badgeUrl: “/img/123”,
			badgeName: “Bug Crusher”
		},
		task: {
			done: 8,
			total:  10
		}
	}
}

```
```javascript
// UserNotFound
{
	status: “error”,
	data: {
		message: “User does not exist”
	}
}
```
```javascript
// UnknownError
{
	status: “error”,
	data: {
		message: “An unknown error occurred”
	}
}
```

## GET /users/:userId/tasks
Endpoint for retrieving user's tasks

**Response**
```javascript
// HTTP status code: 200
{
	status: “success”,
	data: {
		todo: [{
			taskId: “a1bvc3”,
			taskName: “Battlefields UI”,
			taskDescription: “Create assets for the battlefield screen”
			taskPoints: 3
		},
    {
			taskId: “a1bvjk”,
			taskName: “Create Tasks API”,
			taskDescription: “Expose a task API”
			taskPoints: 3
		}],
		ongoing: [],
		done: [{
			taskId: “ybhv213s”,
			taskName: “Create Login API”,
			taskDescription: “Expose a login API”
			taskPoints: 1
    }]
	}
}

```
```javascript
//UserNotFound
{
	status: “error”,
	data: {
		message: “User does not exist”
	}
}
```
```javascript
// UnknownError
{
	status: “error”,
	data: {
		message: “An unknown error occurred”
	}
}
```

## POST /tasks
Endpoint for Creating Tasks

**Sample Request Body**
```javascript
{
  taskName: "Battlefield Assets",
  taskDescription: "Create assets for the battle field screen...",
  assignedTo: "id123",
  taskPoints: 3,
  projectId: "asd1231"
}
```

**Response**
```javascript
// HTTP Status Code: 200
{
	status: “success”,
	data: {
		taskId: “asj332”,
		taskName: “Battlefield Assets”,
		description:  “Create assets for the battle field screen …”,
		taskPoints: 3,
		taskStatus: “TODO”,
		assignedTo: “id123”,
		projectName:"Project Name"
	}
}
```

```javascript
//Missing task_name parameter
{
	status: “error”,
	data: {
		message: “Name required”
	}
}
```
```javascript
//Missing task_description parameter
{
	status: “error”,
	data: {
		message: “Description required”
	}
}
```
```javascript
//Missing task_points parameter
{
	status: “error”,
	data: {
		message: “Task points required”
	}
}
```
```javascript
//Missing assigned_to parameter
{
	status: “error”,
	data: {
		message: “Assignee required”
	}
}
```
```javascript
//UnknownError
{
	status: “error”,
	data: {
		message: “An unknown error occurred”
	}
}
```

## PUT /tasks/:taskId
Endpoint for updating tasks details (updating status)

**Sample Request Body**
```javascript
{
  taskStatus: "ONGOING" 
}
```

**Response**
```javascript
// HTTP Status Code: 200
{
	status: “success”,
	data: {
		taskId: “asj332”,
		taskName: “Battlefield Assets”,
		description:  “Create assets for the battle field screen …”,
		taskPoints: 3,
		taskStatus: “ONGOING”,
		assignedTo: “id123”
	}
}
```

```javascript
//TaskNotFound
{
	status: “error”,
	data: {
		message: “Task does not exist”
	}

}
```
```javascript
//UnknownError
{
	status: “error”,
	data: {
		message: “An unknown error occurred”
	}
}
```

## GET /projects/:projectId
Endpoint for retrieving project details

**Response**
```javascript
// HTTP status code: 200
{
	status: “success”,
	data: {
		projectName: “Project Name 2”,
		tasksTodo: 5,
		tasksOngoing: 1,
		tasksDone: 2,
		dueDate: “2016-02-17T08:33:23.257Z”
	}
}
```
```javascript
//ProjectNotFound
{
	status: “error”,
	data: {
		message: “Project does not exist”
	}
}
```
```javascript
// UnknownError
{
	status: “error”,
	data: {
		message: “An unknown error occurred”
	}
}
```

## POST /projects
Endpoint for Creating projects

```
**parameters:**
| Name | Type |
| --- | --- |
| projectName | String(Required) |
| members | [String](Optional) |
| dueDate | String(Optional) |
```
**Sample Request Body**
```javascript
{
  projectName: "Project Name",
  members: ["id123", "ad123", "eq678"],
  dueDate: "2016-02-17T 08:33:23.257 Z"
}
```

**Response**
```javascript
// HTTP Status Code: 200
{
	status: “success”,
	data: {
		projectName: “Project Name 2”, status: “TODO”
		members: ["id123", "ad123", "eq678"],
		due_date:”2016-02-17T08:33:23.257Z”
	}
}
```

```javascript
//Missing project name parameter
{
	status: “error”,
	data: {
		message: “Project name required”
	}
}
```
```javascript
//A user does not exist
{
	status: “error”,
	data: {
		message: “Cannot add member to project”
	}
}
```
```javascript
//UnknownError
{
	status: “error”,
	data: {
		message: “An unknown error occurred”
	}
}
```

## PUT /projects/:projectId
Endpoint for updating project entry

```
**Parameters:**
| Name | Type |
| --- | --- |
| projectName | String(Optional) |
| members | [String](Optional) |
| dueDate | String(Optional) |
| status | String(Optional) |
```

**Sample Request Body**
```javascript
{
  	projectName: "Project Name",
  	members: ["sda123", "asd123", "eqw687", "agh982"],
  	dueDate: "2016-02-17T 08:33:23.257 Z",
  	status: "ONGOING"
}
```

**Response**
```javascript
// HTTP Status Code: 200
{
	status: “success”,
	data: {
		projectName: “Project Name ”,
		status: “TODO”
		members: ["sda123", "asd123", "eqw687", "agh982"]
		dueDate:”2016-02-17T08:33:23.257Z”
	}
}
```

```javascript
//ProjectNotFound
{
	status: “error”,
	data: {
		message: “Project does not exist”
	}

}
```
```javascript
//A User does not exist
{
	status: “error”,
	data: {
		message: “Cannot add member to project”
	}
}
```
```javascript
//UnknownError
{
	status: “error”,
	data: {
		message: “An unknown error occurred”
	}

}
```

## GET /projects/:projectId/members
Endpoint for retrieving project members

**Response**
```javascript
// HTTP status code: 200
{
	status: “success”,
	data: [
		{
			name: “Fountain”,
			gender: “male”,
			activeBadge: {
				imageUrl: “/img/123”,
				badgeName: “Bug Crusher”
			},
			task: {
				todo: [
					{
						taskId: “a1bvc3”,
						taskName: “Battlefields UI”,
						taskDescription: “Create assets for the battlefield screen”
						taskPoint: 3
		
					},
					{
						taskid: “a1bvjk”,
						taskName: “Create Tasks API”,
						taskDescription: “Expose a task API”
						taskPoint: 3
		
					}
				],
				ongoing: [],
				done: [
					{
						taskId: “ybhv213s”,
						taskName: “Create Login API”,
						taskDescription: “Expose a login API”
						taskPoint: 1
					}
				]

			}
		},
		{
			name: “Pen”,
			gender: “female”,
			activeBadge: {
				imageUrl: “/img/456”,
				badgeName: “Space Trainee”
			},
			task: {
				todo: [],
				ongoing: [],
				done: []
			}
		}

	]
}
```
```javascript
//ProjectNotFound
{
	status: “error”,
	data: {
		message: “Project does not exist”
	}
}
```
```javascript
//UnknownError
{
	status: “error”,
	data: {
		message: “An unknown error occurred”
	}

}
```

## GET /leaders/projects
Endpoint for retrieving project leaderboards

**Response**
```javascript
// HTTP status code: 200
{
	status: “success”
	data: {[
		{
			projectName: “Project Name 2”, 
			tasksDone: 11,
			tasksTotal: 20
			members: [{
					userName: “Fountain”,
					gender: “male”
					avatarUrl: “img/4564” 
				},
				{
					userName: “Pen”,
					gender: “female”
					avatarUrl: “img/5675” 
				}
			] 
		},
		{
			projectName: “Project Name ”, 
			tasksDone: 11,
			tasksTotal: 30,
			members: [{
					userName: “Fountain”,
					gender: “male”
					avatarUrl: “img/4564” 
				},
				{
					userName: “Pen”,
					gender: “female”,
					avatarUrl: “img/5675” 
				},
				{
					userName: “AJ”,
					gender: “female”,
					avatarUrl: “img/1235645” 
				}
			]
		}
	]}
}
```
```javascript
//UnknownError
{
	status: “error”,
	data: {
		message: “An unknown error occurred”
	}

}
```

## GET /leaders/users
Endpoint for retrieving user leaderboards

**Response**
```javascript
// HTTP status code: 200
{
	status: “success”
	data: [{
			user_name: “Big Beear”,
			gender: “male”,
			avatarUrl: “/avatar/13123”,
			activeBadge: {
				badgeUrl: “img/353”,
				badgeName: “Sojourner”
			},
			level: {
				levelName: “level 2”,
				totalPoints: 55
			},
			badges: [{
					badgeUrl: “img/353”,
					badgeName: “Sojourner”
				},
				{
					badgeUrl: “img/56789”,
					badgeName: “Space Trainee”
				},
				{
					badgeUrl: “img/1234”,
					badgeName: “Destroyer”
				}
			]
		},
		{
			userName: “AJ”,
			gender: “female”,
			avatarUrl: “/avatar/567567”,
			activeBadge: {
				badgeUrl: “img/56789”,
				badgeName: “Space Trainee”
			},
			level: {
				levelName: “level 1”,
				totalPoints: 5
			},
			badges: [{
					badgeUrl: “img/353”,
					badgeName: “Sojourner”
				},
				{
					badgeUrl: “img/56789”,
					badgeName: “Space Trainee”
				}
			]
		}
	]
}
```
```javascript
//UnknownError
{
	status: “error”,
	data: {
		message: “An unknown error occurred”
	}

}
```
