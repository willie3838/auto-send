import { resolveContent } from "nodemailer/lib/shared";
import http from "../http-common";

class EmailService {

    async sendEmail(emailContent){
        return await http.post('/send', emailContent)
    }

    async authenticateEmail(credentials){
        return await http.post('/authenticate', credentials)
    }
}
export default new EmailService;



