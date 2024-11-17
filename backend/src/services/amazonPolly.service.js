import "dotenv/config";
import AWS from 'aws-sdk';

const credentials = new AWS.Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
AWS.config.credentials = credentials;


class TransformerTextToAudio {

    constructor() {
        this.client = new AWS.Polly({
            signatureVersion: 'v4',
            region: "us-east-1"
        });
    }

    transform(params) {
        return this.client.startSpeechSynthesisTask(params).promise()
    };


    getVoicesAndLanguages() {
        const params = {
            Engine: "neural"
        };
        return this.client.describeVoices(params).promise()

            
    };

    
}

/* new TransformerTextToAudio()
    .transform({
        Text: `Había una vez en la exuberante selva, dos poderosos animales que reinaban en sus respectivos 
        territorios: un león majestuoso y un tigre imponente. Ambos eran conocidos por su valentía y ferocidad, 
        pero nunca antes se habían cruzado en su vasto reino.

        Un día, el león y el tigre se encontraron frente a frente en un claro del bosque. Se miraron fijamente, 
        evaluándose mutuamente con respeto. Aunque ambos eran rivales naturales, decidieron dejar de lado sus 
        diferencias y entablar una conversación.`,
        OutputFormat: 'mp3',
        VoiceId: "Pedro",
        LanguageCode: "es-US",
        Engine: "neural",
        OutputS3BucketName: process.env.BUCKET,
        OutputS3KeyPrefix: uuid.v4()
    })
    .then(console.log) */

export default TransformerTextToAudio;