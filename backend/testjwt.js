//  this is just some testing of jwt using api now \
// jwt is tested by post man so we does not need these 
const refreshToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inplcm9iZWFyODUzMDAzMiIsImVtYWlsIjoiemVyb2JlYXI4NTMwMDMyQGdtYWlsLmNvbSIsImlkIjoiNjkyYjQwZjYzZWJlYTUxYjk4ZWU5MzJhIiwiaWF0IjoxNzY0NDQ1MTc2LCJleHAiOjE3NjUwNDk5NzZ9.RaJsVV9bgYWX-hsg-bpPHoCClRQvIOFNx27rdsVb22s";
const accessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inplcm9iZWFyODUzMDAzMiIsImVtYWlsIjoiemVyb2JlYXI4NTMwMDMyQGdtYWlsLmNvbSIsImlkIjoiNjkyYjQwZjYzZWJlYTUxYjk4ZWU5MzJhIiwiaWF0IjoxNzY0NDQ2Mzc3LCJleHAiOjE3NjQ0NDcyNzd9.5rPol4uwdcc3HUCHdwFl1U7b65gHOvQ6ngQ6blEXut0";
async function testFetch() {
    try {
        const response = await fetch("http://localhost:8000/resume/1", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Cookie": `refreshToken=${refreshToken}`
            }
        });

        // safely parse JSON (in case server returns non-JSON)
        const data = await response.json().catch(() => null);

        console.log("Status:", response.status);
        console.log("Response:", data);
    } catch (err) {
        console.error("Error:", err);
    }
}

// call the async function
testFetch();