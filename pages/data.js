async function getRecommendations(){
    let options = {
        args: ["happy", "happy"]
    }
    let { PythonShell } = require("python-shell");
    // await PythonShell.run('calHack.py', options, function (err, result) {
    //     if (err) throw err;
    //     console.log('finished');
    //     console.log(result);
    //   });

}
export default getRecommendations;