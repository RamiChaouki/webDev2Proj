// import dotenv from 'dotenv'
// import aws from 'aws-sdk'
// import crypto from 'crypto'
// import { promisify } from "util"

require('dotenv').config();
const aws = require('aws-sdk');
const crypto = require('crypto')
const {promisify}=require('util');

const randomBytes = promisify(crypto.randomBytes)


const region ="us-east-1";
const bucketName="user-profile-pic-bucket";
const accessKeyId=process.env.ACCESS_KEY_ID;
const secretAccessKey=process.env.SECRET_ACCESS_KEY;

const credentials=new aws.Credentials(accessKeyId,secretAccessKey);


const s3 = new aws.S3({
    region,
    credentials,
    signatureVersion:'v4'
})

async function generateUploadURL(){
    const rawBytes= await randomBytes(16);
    const imageName=rawBytes.toString('hex');

    const params=({
        Bucket:bucketName,
        Key:imageName,
        Expires:60
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject',params)
    return uploadURL
}

module.exports= generateUploadURL;