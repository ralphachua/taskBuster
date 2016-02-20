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
		avatar_url: "/avatar/abc",
		level:  {
			name: “level 2”,
			current_points: 30,
			required_points: 50
		},
		active_badge: {
			badge_url: “/img/123”,
			badge_name: “Bug Crusher”
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

## GET /users/:user_id/tasks
Endpoint for retrieving user's tasks

**Response**
```javascript
// HTTP status code: 200
{
	status: “success”,
	data: {
		todo: [{
			task_id: “a1bvc3”,
			task_name: “Battlefields UI”,
			task_description: “Create assets for the battlefield screen”
			task_points: 3
		},
    {
			task_id: “a1bvjk”,
			task_name: “Create Tasks API”,
			task_description: “Expose a task API”
			task_points: 3
		}],
		ongoing: [],
		done: [{
			task_id: “ybhv213s”,
			task_name: “Create Login API”,
			task_description: “Expose a login API”
			task_points: 1
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
  task_name: "Battlefield Assets",
  task_description: "Create assets for the battle field screen...",
  assigned_to: "id123",
  task_points: 3
}
```

**Response**
```javascript
// HTTP Status Code: 200
{
	status: “success”,
	data: {
		task_id: “asj332”,
		task_name: “Battlefield Assets”,
		description:  “Create assets for the battle field screen …”,
		task_points: 3,
		task_status: “TODO”,
		assigned_to: “id123”
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

## PUT /tasks/:task_id
Endpoint for updating tasks details (updating status)

**Sample Request Body**
```javascript
{
  task_status: "ONGOING" 
}
```

**Response**
```javascript
// HTTP Status Code: 200
{
	status: “success”,
	data: {
		task_id: “asj332”,
		task_name: “Battlefield Assets”,
		description:  “Create assets for the battle field screen …”,
		task_points: 3,
		task_status: “ONGOING”,
		assigned_to: “id123”
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

## GET /projects/:project_id
Endpoint for retrieving project details

**Response**
```javascript
// HTTP status code: 200
{
	status: “success”,
	data: {
		project_name: “Project Name 2”,
		tasks_todo: 5,
		tasks_ongoing: 1,
		tasks_done: 2,
		due_date: “2016-02-17T08:33:23.257Z”
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
parameters:	project_name(Required)
		members(Optional)
		due_date(Optional)

**Sample Request Body**
```javascript
{
  project_name: "Project Name",
  members: ["id123", "ad123", "eq678"],
  due_date: "2016-02-17T 08:33:23.257 Z"
}
```

**Response**
```javascript
// HTTP Status Code: 200
{
	status: “success”,
	data: {
		project_name: “Project Name 2”, status: “TODO”
		members:[
			{
				name: “Fountain”,
				gender: “male”,
				active_badge: {
					image_url: “/img/123”,
					badge_name: “Bug Crusher”
				},
				tasks: {} 
			}
		]
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

## PUT /projects/:project_id
Endpoint for updating project entry
Parameters: 	project_name(Optional)
		members(Optional)
		due_date(Optional)
		status(Optional)
		tasks(Optional)
		
**Sample Request Body**
```javascript
{
  	project_name: "Project Name",
  	members: ["sda123", "asd123", "eqw687", "agh982"],
  	due_date: "2016-02-17T 08:33:23.257 Z",
  	status: "ONGOING",
  	tasks: [“jjl999”, “hjf564”, "yuy355"]
}
```

**Response**
```javascript
// HTTP Status Code: 200
{
	status: “success”,
	data: {
		project_name: “Project Name ”,
		status: “TODO”
		members:[{
				name: “Fountain”,
				gender: “male”,
				active_badge: {
					image_url: “/img/123”,
					badge_name: “Bug Crusher” 
				},
				tasks: {}
			}
		]
		due_date:”2016-02-17T08:33:23.257Z”,
		tasks: [{
				task_id: “a1bvc3”,
				task_name: “Battlefields UI”,
				task_description: “Create assets for the battlefield screen”,
				task_point: 3
			},
			{
				task_id: “a1bvjk”,
				task_name: “Create Tasks API”,
				task_description: “Expose a task API”,
				task_point: 3
			}
		}]
	}
}
```

```javascript
//A Task does not exist
{
	status: “error”,
	data: {
		message: “Cannot add task to project”
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
//Invalid Status
{
	status: ”error”,
	data : {
	message: “Please give a valid status”
	}
}
```
```javascript
//Invalid Date
{
	status: “error”,	
	data: {
		message: “Please give a valid date”
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

## GET /users/:user_id/projects
Endpoint for retrieving user's projects

**Response**
```javascript
// HTTP status code: 200
{
	status: “success”,
	data: [{
		project_id: “hja12”,
		project_name: “Project Name 2”,
		due_date: “2016-02-17T08:33:23.257Z”
	}]
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
//UnknownError
{
	status: “error”,
	data: {
		message: “An unknown error occurred”
	}

}
```

## GET /projects/:project_id/members
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
			active_badge: {
				image_url: “/img/123”,
				badge_name: “Bug Crusher”
			},
			task: {
				todo: [
					{
						task_id: “a1bvc3”,
						task_name: “Battlefields UI”,
						task_description: “Create assets for the battlefield screen”
						task_point: 3
		
					},
					{
						task_id: “a1bvjk”,
						task_name: “Create Tasks API”,
						task_description: “Expose a task API”
						task_point: 3
		
					}
				],
				ongoing: [],
				done: [
					{
						task_id: “ybhv213s”,
						task_name: “Create Login API”,
						task_description: “Expose a login API”
						task_point: 1
					}
				]

			}
		},
		{
			name: “Pen”,
			gender: “female”,
			active_badge: {
				image_url: “/img/456”,
				badge_name: “Space Trainee”
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

## GET /projects/leaders
Endpoint for retrieving project leaderboards

**Response**
```javascript
// HTTP status code: 200
{
	status: “success”
	data: {[
		{
			project_name: “Project Name 2”, 
			tasks_done: 11,
			tasks_total: 20
			members: [{
					user_name: “Fountain”,
					gender: “male”
					avatar_url: “img/4564” 
				},
				{
					user_name: “Pen”,
					gender: “female”
					avatar_url: “img/5675” 
				}
			] 
		},
		{
			project_name: “Project Name ”, 
			tasks_done: 11,
			tasks_total: 30,
			members: [{
					user_name: “Fountain”,
					gender: “male”
					avatar_url: “img/4564” 
				},
				{
					user_name: “Pen”,
					gender: “female”,
					avatar_url: “img/5675” 
				},
				{
					user_name: “AJ”,
					gender: “female”,
					avatar_url: “img/1235645” 
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

## GET /users/leaders
Endpoint for retrieving user leaderboards

**Response**
```javascript
// HTTP status code: 200
{
	status: “success”
	data: [{
			user_name: “Big Beear”,
			gender: “male”,
			avatar_url: “/avatar/13123”,
			active_badge: {
				badge_url: “img/353”,
				badge_name: “Sojourner”
			},
			level: {
				level_name: “level 2”,
				total_points: 55
			},
			badges: [{
					badge_url: “img/353”,
					badge_name: “Sojourner”
				},
				{
					badge_url: “img/56789”,
					badge_name: “Space Trainee”
				},
				{
					badge_url: “img/1234”,
					badge_name: “Destroyer”
				}
			]
		},
		{
			user_name: “AJ”,
			gender: “female”,
			avatar_url: “/avatar/567567”,
			active_badge: {
				badge_url: “img/56789”,
				badge_name: “Space Trainee”
			},
			level: {
				level_name: “level 1”,
				total_points: 5
			},
			badges: [{
					badge_url: “img/353”,
					badge_name: “Sojourner”
				},
				{
					badge_url: “img/56789”,
					badge_name: “Space Trainee”
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
