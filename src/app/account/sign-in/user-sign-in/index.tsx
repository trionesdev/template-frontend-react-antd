import {useState} from "react";
import {AccountSignIn} from "@app/account/sign-in/user-sign-in/AccountSignIn.tsx";
import _ from "lodash";
import {SmsSignIn} from "@app/account/sign-in/user-sign-in/SmsSignIn.tsx";

export const UserSignIn = () => {
    const [type, setType] = useState('account')
    return <>
        {_.isEqual(type, 'account') && <AccountSignIn onTypeChange={setType}/>}
        {_.isEqual(type, 'sms') && <SmsSignIn onTypeChange={setType}/>}
    </>
}