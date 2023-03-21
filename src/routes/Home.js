import React from 'react'

function Home(userInfo) {
    return (
        <div className="home">
            <h1>Home</h1>
            <script>
                function test(){
                    console.log(userInfo)
                }
            </script>
        </div>
    )
}

export default Home;