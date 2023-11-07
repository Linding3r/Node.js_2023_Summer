import SibApiV3Sdk from 'sib-api-v3-sdk';
import { Router } from 'express';
import { config } from 'dotenv';
config();

const router = Router();

// Get the instance for the API client
const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SMTP_API_KEY;

// Uncomment below two lines to configure authorization using: partner-key
// const partnerKey = defaultClient.authentications['partner-key'];
// partnerKey.apiKey = 'YOUR_PARTNER_KEY';
router.post('/contact', async (req, res) => {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    // Define the email to be sent
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail({
    to: [{
        email: 'lindingertwitch@gmail.com',
        name: 'Thomas Lindinger'
    }],
    sender: {
        email: 'thomasjuullindinger@yahoo.dk',
        name: 'Thomas Lindinger'
    },
    templateId: 1,
    params: {
        name: 'John',
        surname: 'Doe'
    },
    headers: {
        'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2',
    }
    });

    // Send the email
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
    console.log('API called successfully. Returned data: ' + data);
    }, function(error) {
    console.error(error);
    });
});

export default router;
