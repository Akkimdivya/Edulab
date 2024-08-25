# EVENT_MANAGEMENT
## Develop a backend API for an advanced event management system using Node.js and Express.js.

- ## POST AddEvent
``` https://edulab-nzvn.onrender.com/api/events ```
```
{
  "name": "Some Event here",
  "date": "2024/09/01",
  "sessions": [
    {
      "name": "Session 3",
      "startTime": "11:00:AM",
      "endTime": "12:00:PM",
      "participants": [
        { "name": "Person 1", "email": "person1@mail.com" },
        { "name": "Person 2", "email": "person2@mail.com" }
      ]
    }
  ]
}
```
- ## PUT UpdateEvent
```https://edulab-nzvn.onrender.com/api/events ```
```
{
  "name": "Some Event here",
  "date": "2024/09/01",
  "sessions": [
    {
      "name": "Session 3",
      "startTime": "11:00:AM",
      "endTime": "12:00:PM",
      "participants": [
        { "name": "Person 1", "email": "person1@mail.com" },
        { "name": "Person 2", "email": "person2@mail.com" }
      ]
    }
  ]
}
```

- ## DELETE DeleteEvent
```https://edulab-nzvn.onrender.com/api/events/:id ```

- ## GET GetEvent
```https://edulab-nzvn.onrender.com/api/events/:id ```

- ## GET GetPdf
```https://edulab-nzvn.onrender.com/api/events/:id/pdf ```






