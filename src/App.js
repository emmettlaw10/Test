import './App.css';
import Header from "./components/header/Header";
import Registration from "./pages/registration/Registration";


function App() {
    const submitFormData = async (values) => {
        try {
            const response = await fetch("https://fullstack-test-navy.vercel.app/api/users/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            });
            console.log(response)
            return response
        }catch (error) {
            console.log(error.message)
        }
    }

  return (
    <div>
      <Header/>
      <div>
        <Registration onSave={submitFormData}/>
      </div>
    </div>
  );
}

export default App;
