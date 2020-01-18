# AWS SES Email Template Manager

Simple Web Application to manage AWS SES email templates.

- Connects to your AWS SES account
- Let's you create new templates, edit or delete the existing ones
- HTML Editor and side-by-side instant preview
- Enhanced editor: format HTML, word-wrap, change font size
- Extract the text from the HTML and copy to the template text part


![ASW SES Email Template Manager Screenshot: Template List](https://criptalia.global.ssl.fastly.net/directus/screenshot-2020-01-18-at-00.54.11.png)

![ASW SES Email Template Manager Screenshot: Template Editor with preview](https://criptalia.global.ssl.fastly.net/directus/screenshot-2020-01-18-at-01.16.11.png)

![Real Time Editor](https://criptalia.global.ssl.fastly.net/directus/aws-ses-animation.gif)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- An AWS Account with access to SES Templates
- NodeJS

### Installing

Install node modules

`yarn`

Copy .env.example to .env

`cp .env.example .env`

Setup your environment variables on your `.env` file

`REACT_APP_REGION=`
`REACT_APP_AWS_ACCESS_KEY_ID=`
`REACT_APP_AWS_SECRET_ACCESS_KEY=`

Run the application

`yarn start`

## Deployment

To deploy this application to production, you may consider implement an authentication mechanism.

## Authors

Based on the work of:
- **Gian Ramirez** [zendostrike](https://github.com/zendostrike)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
