const { S3Client } = require("@aws-sdk/client-s3")

const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY

//If more aws services are installed, add them here
//Example how to use: awsService.s3Client.send()
const awsService = {
    s3Client: new S3Client({ 
        region: AWS_BUCKET_REGION,
        credentials: {
            accessKeyId: AWS_PUBLIC_KEY,
            secretAccessKey: AWS_SECRET_KEY
        }
    })
}

module.exports = awsService
