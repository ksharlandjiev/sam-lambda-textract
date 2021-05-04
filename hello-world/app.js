// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
const aws = require("aws-sdk");
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */


exports.lambdaHandler = async (event, context) => {
    try {
    
        const ret = await getText(event.body);
        
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                text: ret
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};

async function getText(file) {
   
   /* init Textract object */
   const textract = new aws.Textract();
           
    /* prepare Textract request */       
    const params = {
        Document: {
          /* File is received as base64 encoded in the body, and Textract expects buffer */
          Bytes: Buffer.from(file, 'base64')
        }
    };
    
  const data = await textract.detectDocumentText(params).promise();
  return data;
}