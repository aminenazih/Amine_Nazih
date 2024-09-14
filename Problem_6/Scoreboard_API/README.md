# Scoreboard API Module

## Overview
This module is responsible for managing the scoreboard for a gaming application. It provides real-time updates to the top 10 users based on their scores, ensuring secure score updates and live scoreboard functionality.

### Features
- **Score Update API:** Users' scores are updated upon successful completion of actions.
- **Live Scoreboard:** Real-time updates to the scoreboard showing the top 10 users.
- **Security:** Authentication and validation to prevent unauthorized score manipulations.

## API Endpoints

### 1. Update Score
- **Endpoint:** `POST /api/updateScore`
- **Method:** POST
- **Description:** Updates the user's score.
- **Request Body:**
    ```json
    {
        "userId": "string",
        "actionId": "string",
        "authToken": "string"
    }
    ```
- **Response:**
    ```json
    {
        "status": "success",
        "message": "Score updated successfully"
    }
    ```
- **Error Responses:**
    - `400 Bad Request` if the input is invalid.
    - `401 Unauthorized` if the auth token is invalid.

### 2. Get Scoreboard
- **Endpoint:** `GET /api/scoreboard`
- **Method:** GET
- **Description:** Retrieves the top 10 users' scores.
- **Response:**
    ```json
    {
        "top10Users": [
            {
                "userId": "string",
                "userName": "string",
                "score": "number"
            },
            ...
        ]
    }
    ```

## Security Considerations
- **Authentication:** Ensure each request has a valid auth token.
- **Rate Limiting:** Prevent abuse by limiting score update requests.
- **Logging:** Log all requests for traceability and auditing.

## Real-Time Updates
- Use WebSockets to broadcast score changes to all connected clients, ensuring the scoreboard updates in real-time.

## Future Improvements
- **Caching:** Implement caching for scoreboard data to reduce database queries.
- **Leaderboards:** Add regional or custom leaderboards in addition to the global top 10.

![scoreboard-api](https://github.com/aminenazih/Amine_Nazih/blob/main/scoreboard-api.png)

## Future Improvements
- **Caching:** To reduce the load on the database and improve response times, consider adding caching for the top 10 users.
- **Leaderboards:** Expand the module to include regional or custom leaderboards.
- **Analytics:** Track how often scores are updated and which users are most active.

