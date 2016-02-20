# API Specifications

## GET /users/:user_id
Endpoint for retrieving user details

### Response
```javascript
// HTTP status code: 200
{
	status: “success”,
	data: {
		name: “Fountain”,
		gender: “male”,
		level:  {
			name: “level 2”,
			current_points: 30,
			required_points: 50
},
		active_badge: {
			image_url: “/img/123”,
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

### Response
```javascript
// HTTP status code: 200
{
	status: “success”,
	data: {
		todo: [{
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
		}],
		ongoing: [],
		done: [{
			task_id: “ybhv213s”,
			task_name: “Create Login API”,
			task_description: “Expose a login API”
			task_point: 1
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

### Response
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
//Missing task_description parameter
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

### Response
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
