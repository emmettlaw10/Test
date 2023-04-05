import React, {useState} from "react";
import {useForm, useController} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Registration.css"



const Registration = ({onSave}) => {

    const currentDate = new Date();

    const [myYear, setMyYear] = useState(currentDate);
    const [myMonth, setMyMonth] = useState(currentDate);
    const [myDay, setMyDay] = useState(currentDate);

    const minDate = new Date(myYear.getFullYear(), myMonth.getMonth(), 1);
    const maxDate = new Date(myYear.getFullYear(), myMonth.getMonth() + 1, 0);

    const renderDayContents = (day, date) => {
        if (date < minDate || date > maxDate) {
            return <span></span>;
        }
        return <span>{date.getDate()}</span>;
    };

    const myDateSchema = z.date({
        required_error: "Please enter your date of birth",
        invalid_type_error: "Please enter your date of birth",
    });

    const schema = z.object({
        full_name: z.string().min(2, {message: "Please enter a valid name"}).regex(/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z-()]+)*$/, {message: "Please enter a valid name"}),
        contact_number: z.string().length(10, {message: "Please enter a valid phone number"}).regex(/^\d+$/, {message: "Please enter a valid phone number"}),
        email: z.string().email({message: "Please enter a valid email address"}),
        date_of_birth: myDateSchema,
        password: z.string().min(8, {message: "Password must be minimum of 8 characters"}).regex(/^[A-Za-z\d]+$/),
        password_confirm: z.string()
    }).superRefine(({password, password_confirm}, ctx) =>{
        if (password !== password_confirm){
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match",
                path: ['password_confirm']
            });
        }
    });

    const {register, handleSubmit, formState, control} = useForm({resolver: zodResolver(schema)});

    const {errors} = formState;

    const {field: dob} = useController({name: 'date_of_birth', control});

    const handleDate = (date) => {
        setMyYear(date)
        setMyMonth(date)
        setMyDay(date)
        dob.onChange(date)
    }

    const setMessage = (status) => {
        if (status === 200) {
            document.getElementById("message").innerHTML = "✅ User account successfully created"
            document.getElementById("message").style.background= "#CDFADC"
        }
        else {
            document.getElementById("message").innerHTML = "❌ There was an error creating the account"
            document.getElementById("message").style.background= "#FFC0C0"
        }
    }

    const handleSave = async (formValues) => {
        console.log(formValues)
        let a = await onSave(formValues)
        await setMessage(a.status)

    }
    return (
        <div className={"mainContainer"}>
            <div id={"message"}>
            </div>
            <h1>Create User Account</h1>
            <div className={"formContainer"}>
                <form id={"registration"} onSubmit={handleSubmit(handleSave)}>
                    <div className={"inputContainer"}>
                        <p>Full Name</p>
                        <input
                            required
                            type={"text"}
                            id={"name"}
                            {...register("full_name")}
                        />
                        <label className={"floating-label"}>Name</label>
                        <div className={"errMsg"}>
                            {errors.full_name?.message}
                        </div>
                    </div>
                    <div className={"inputContainer"}>
                        <p>Email Address</p>
                        <input
                            required
                            type={"email"}
                            {...register("email")}
                        />
                        <label className={"floating-label"}>Email</label>
                        <div className={"errMsg"}>
                            {errors.email?.message}
                        </div>
                    </div>
                    <div className={"inputContainer"}>
                        <p>Phone Number</p>
                        <input
                            required
                            type={"text"}
                            {...register("contact_number")}
                        />
                        <label className={"floating-label"}>Phone number</label>
                        <div className={"errMsg"}>
                            {errors.contact_number?.message}
                        </div>
                    </div>
                    <div className={"inputContainer"}>
                        <p>Date of Birth</p>
                        <DatePicker
                            selected={myYear}
                            onChange={(date) =>handleDate(date)}
                            showYearPicker
                            maxDate={currentDate}
                            dateFormat="yyyy"
                        />
                    </div>
                    <div className={"inputContainer"}>
                        <DatePicker
                            showMonthYearPicker
                            dateFormat="MMMM"
                            maxDate={currentDate}
                            selected={myMonth}
                            onChange={(date) => handleDate(date)}
                        />
                    </div>
                    <div className={"inputContainer"}>
                        <DatePicker
                            dateFormat="dd"
                            selected={myDay}
                            maxDate={currentDate}
                            renderDayContents={renderDayContents}
                            onChange={(date) => handleDate(date)}
                        />
                        <div className={"errMsg"}>
                            {errors.date_of_birth?.message}
                        </div>
                    </div>

                    <div className={"inputContainer"}>
                        <p>Password</p>
                        <input
                            required
                            type={"text"}
                            {...register("password")}
                        />
                        <label className={"floating-label"}>Password</label>
                        <div className={"errMsg"}>
                            {errors.password?.message}
                        </div>
                    </div>
                    <div className={"inputContainer"}>
                        <p>Confirm Password</p>
                        <input
                            required
                            type={"text"}
                            {...register("password_confirm")}
                        />
                        <label className={"floating-label"}>Confirm Password</label>
                        <div className={"errMsg"}>
                            {errors.password_confirm?.message}
                        </div>
                    </div>
                </form>
            </div>
            <div className={"buttonContainer"}>
                <div>
                    <button className={"cancel"}>Cancel</button>
                </div>
                <button form={"registration"} type={"submit"} className={"submit"}>Submit</button>
            </div>
        </div>
    );
}
export default Registration
