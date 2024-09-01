# nylas-hackathon

*This is a submission for the [Nylas Challenge](https://dev.to/challenges/nylas): AI Expedition.*

# Team Members:
[Violeta](https://www.violeta.dev)

# Technologies
- Nylas API
- Chat GPT
- Firebase
- Emotion
- Material UI
- Next.JS
- Node.JS
- WebSockets
- Accessibility
- Vercel
- Glitch.IO

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5vqkxbhhdtn7a6886cg0.gif)

Try it out here:
[User](https://nylas-hackathon-nextjs.vercel.app/login)
[Admin](https://nylas-hackathon-nextjs.vercel.app/admin)
Note: For the admin you can use these credentials:
```
violetadevnylashackathon@gmail.com
1234
```

## What I Built and Why
<!-- Share an overview about your project and what motivated you to build this project in particular. -->
I built a Random Meeting Matcher tool, designed to facilitate spontaneous connections between remote team members. 

In a traditional office setting, casual conversations—like those over coffee—help foster relationships and build camaraderie. However, in a remote work environment, these serendipitous moments are much harder to come by. This tool aims to bridge that gap by allowing an admin to create scheduled "dates" where team members can queue up and get randomly matched with a colleague for a quick virtual meeting. The motivation behind this project stems from my experience working in a remote company, where I noticed the lack of informal interactions that typically happen in an office setting. 

This tool provides an easy and automated way to recreate those coffee chat moments virtually, helping to maintain the social fabric of the team.

Of course, this could be use in any other context where you want to randomly match two people! This is just a specific use case of the tool I have built.


## Demo
<!-- Share a brief video overview of the project with a screen share, two minutes max.-->

[Video here](https://youtu.be/5oeDtnlfoKs)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ft6seulkfq8kzoh8l6po.png)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/merpbe7c2giktkhpjno3.png)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/y1qhu8i4jmc18qeveo2v.png)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/183rfsij1xcibx50r9e9.png)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wkmnjz131e0e3x3mb7vi.png)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/np3931g7yepcqfjruyes.png)


## Code
<!-- Embed your GitHub repo or any repo link here for us to review your code. Remember, this project must have an MIT license. -->

You can review the full codebase on GitHub:
[App & Back Office](https://github.com/violetadev/nylas-hackathon-nextjs)
[Websockets Server](https://github.com/violetadev/nylas-hackathon-websockets)

The project is open-source and licensed under the MIT License, ensuring that others can freely use and adapt the tool for their own remote teams.

## Your Journey
<!-- Tell us how you leveraged Nylas, what you learned, and what you’re most proud of. -->

<!-- Team Submissions: Please pick one member to publish the submission and credit teammates by listing their DEV usernames directly in the body of the post. -->
I leveraged Nylas' API to handle the creation of calendar events, sign up participants as contacts, and create meeting links, which was crucial for automating the process of setting up virtual meetings. Through this project, I deepened my understanding of integrating third-party APIs into a full-stack application with NextJS and Websockets (I usually focus more in the Frontend part!), particularly in managing user authentication, calendar integrations, and real-time WebSocket connections.
I'm particularly proud of how seamless the user experience turned out, from queueing up to being matched and receiving an invite—all without requiring any manual intervention from the admin. This project not only solved a real problem I've experienced but also provided an opportunity to explore and utilize the powerful capabilities of the Nylas platform.

Credits for the video background [here](https://www.vecteezy.com/video/2016656-minimal-stars-motion-loop-background-for-project-overlay)

# Env Files
If you want your own version, you will need the following variables.
- Set up a Google Dev account (and activate Firebase+oAuth).
- Create an account at [Nylass](https://developer.nylas.com/)
- Create a Google calendar and get the calendar id
- Create a Chat GPT account
- Upload the [websockets server](https://github.com/violetadev/nylas-hackathon-websockets) and add the URI
```
OPENAI_API_KEY= 
NEXT_PUBLIC_WEBSOCKETS_SERVER=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALENDAR_ID=
NYLAS_CLIENT_ID=
NYLAS_CLIENT_SECRET=
NYLAS_GRANT_ID=
NYLAS_API_KEY=
NYLAS_API_KEY_NAME=
NYLAS_API_URI=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_WEB_API_KEY=
NEXT_PUBLIC_FIREBASE_APP_ID=
FIREBASE_PROJECT_NAME=
FIREBASE_PROJECT_NUMBER=
FIREBASE_SERVICE_ACCOUNT=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_ACCOUNT_TYPE=
FIREBASE_CLIENT_ID=
FIREBASE_AUTH_URI=
FIREBASE_TOKEN_URI=
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=
FIREBASE_CLIENT_X509_CERT_URL=
FIREBASE_PRIVATE_KEY=
NEXT_PUBLIC_USER_ID=
```


<!-- Don't forget to add a cover image (if you want). -->

<!-- Thanks for participating! -->
