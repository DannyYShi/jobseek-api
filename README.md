# Jobseek (server)

This is the backend code for Jobseek, a job application tracking dashboard that allows users to create and track the basic details and status of various job applications. 

**Link to Live App:** https://jobseek.vercel.app/  
**Link to Client Repo:** https://github.com/danny-shi/jobseek

## API Documentation
### Lists Endpoints 
### ▸ `GET /api/lists`
Returns an array of all the lists, along with the array of cards associated with each list with all of the basic details attached to it. 

**Example**
```JSON
[
    {
        "list_id": 1,
        "list_name": "Wishlist",
        "cards": [
            {
                "card_id": 2,
                "company_name": "Uber",
                "position_applied": "Driver",
                "job_location": "San Francisco",
                "job_url": "www.uber.com/careers",
                "job_description": "This is another example"
            },
            {
                "card_id": 27,
                "company_name": "Facebook",
                "position_applied": "Software Engineer",
                "job_location": null,
                "job_url": null,
                "job_description": null
            }
        ]
    },
    {
        "list_id": 2,
        "list_name": "Applied",
        "cards": [
            {
                "card_id": 23,
                "company_name": "Google",
                "position_applied": "Googler",
                "job_location": null,
                "job_url": null,
                "job_description": null
            }
        ]
    },
    {
        "list_id": 3,
        "list_name": "Interview",
        "cards": []
    },
    {
        "list_id": 4,
        "list_name": "Offer",
        "cards": []
    },
    {
        "list_id": 5,
        "list_name": "Rejected",
        "cards": []
    }
]
```

### Cards Endpoints
### ▸ `GET /api/cards`
Returns an array of all the cards that are in the database, along with the basic information that is attached to each of them. 

**Example**
```JSON
[
    {
        "list_id": 1,
        "card_id": 2,
        "company_name": "Uber",
        "position_applied": "Driver",
        "job_location": "San Francisco",
        "job_url": "www.uber.com/careers",
        "job_description": "This is another example"
    },
    {
        "list_id": 1,
        "card_id": 27,
        "company_name": "Facebook",
        "position_applied": "Software Engineer",
        "job_location": null,
        "job_url": null,
        "job_description": null
    },
    {
        "list_id": 2,
        "card_id": 23,
        "company_name": "Google",
        "position_applied": "Googler",
        "job_location": null,
        "job_url": null,
        "job_description": null
    }
]
```

### ▸ `GET /api/cards/:list_id`
Returns an array of cards according to the list that they are associated with. 

**Example** 

```JSON
[
    {
        "card_id": 2,
        "company_name": "Uber",
        "position_applied": "Driver",
        "job_location": "San Francisco",
        "job_url": "www.uber.com/careers",
        "job_description": "This is another example"
    },
    {
        "card_id": 27,
        "company_name": "Facebook",
        "position_applied": "Software Engineer",
        "job_location": null,
        "job_url": null,
        "job_description": null
    }
]
```

### ▸ `POST /api/cards/`
This endpoint inserts a new card that represents a job application. A POST request is only valid when you are given a `list_id`, `company_name`, and `position_applied`. 

**Example** 
```JSON 
{
    "list_id": 1,
    "company_name": "Name of Company",
    "position_applied": "Job position" 
}
```
### ▸ `PATCH /api/cards/:card_id`
This endpoint updates the card object information fields. Examples of the request body fields that may be edited include: `list_id`, `company_name`, `position_applied`, `job_location`, `job_url`, and `job_description`. If there is no request body, it will return a 400 error with the message ```{Error: "Missing request body"} ```

**Example** 
```JSON
{
    "job_location": "Vienna, VA",
    "job_url": "www.amazon.com/careers",
    "job_description": "This is the first job that I applied to!" 
}
```

### ▸ `DELETE /api/cards/:card_id`
This endpoint deletes a card object by its `card_id`.

## Technology Stack

* **Express** for handling API requests
* **Node** for interacting with the file system
* **PostgreSQL** for the database 
* **Knex.js** for interfacing with the **PostgreSQL** database
* **Postgrator** for database migration
* **Heroku** for deploying the database
