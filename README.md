# Jobseek (server)

This is the backend code for Jobseek, a job application tracking dashboard that allows users to create and track the basic details and status of various job applications. 

Link to Live App: https://jobseek.vercel.app/
Link to Client Repo: https://github.com/danny-shi/jobseek

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

## Technology Stack

* **Express** for handling API requests
* **Node** for interacting with the file system
* **PostgreSQL** for the database 
* **Knex.js** for interfacing with the **PostgreSQL** database
* **Postgrator** for database migration
* **Heroku** for deploying the database
