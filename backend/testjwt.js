// // // // For Node.js < 18, uncomment below
// // // // import fetch from "node-fetch";

// async function testLogin() {
//     try {
//         const response = await fetch("http://localhost:8000/login", {
//             method: "POST",
//             body:JSON.stringify({email:"zerobear@gmail.com",password:"1"}),
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         });

//         const data = await response.json();
//         return data;
//     } catch (err) {
//         console.error("Error:", err.message);
//     }
// }

// const data=await testLogin();
// console.log(data);

// // // Run the test
// // const data=await testLogin();
// // const accessToken= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inplcm9iZWFyODUzMDAzMiIsImVtYWlsIjoiemVyb2JlYXJAZ21haWwuY29tIiwiaWF0IjoxNzYzMTUzNjYwLCJleHAiOjE3NjMxNTQ1NjB9.xq2xocSaIlL0kHdde91lB_W_a5eNTrVxWle_if_sA_k"
// // const refreshToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inplcm9iZWFyODUzMDAzMiIsImVtYWlsIjoiemVyb2JlYXJAZ21haWwuY29tIiwiaWF0IjoxNzYzMTUzNjYwLCJleHAiOjE3NjM3NTg0NjB9.4KvT8iBbzLiQafXIFaLjNW0GTPauHG3w562c8tmdGnE"; 
const accessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inplcm9iZWFyODUzMDAzMiIsImVtYWlsIjoiemVyb2JlYXJAZ21haWwuY29tIiwiaWF0IjoxNzYzMTU0NTAyLCJleHAiOjE3NjMxNTU0MDJ9.volm0VOJwTEyV0dipVJM1FbnQcIHrZuZqQ08uNy1y-U"
const refreshToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inplcm9iZWFyODUzMDAzMiIsImVtYWlsIjoiemVyb2JlYXJAZ21haWwuY29tIiwiaWF0IjoxNzYzMTU0NTAyLCJleHAiOjE3NjMxNTU0MDJ9.volm0VOJwTEyV0dipVJM1FbnQcIHrZuZqQ08uNy1y-U"
// // // Node 18+ global fetch, no import needed
async function testFetch() {
    try {
        const response = await fetch("http://localhost:8000/", {
            method: "GET",
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