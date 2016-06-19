var APPDATA = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + 'Library/Preferences' : '/var/local');
var SAVELOCATION = APPDATA+"/AIE-Game"

fs.access(APPDATA, fs.R_OK | fs.W_OK, (err) => {
  if (err != null){fs.mkdir(APPDATA);};
  fs.access(SAVELOCATION, fs.R_OK | fs.W_OK, (err) => {
    if (err != null){fs.mkdir(SAVELOCATION);};
    fs.access(SAVELOCATION+"/score.json", fs.R_OK | fs.W_OK, (err) => {
      if (err != null){fs.writeFileSync(SAVELOCATION+"/score.json", JSON.stringify({"highscore": 0}));}
    });
    highscore = JSON.parse(fs.readFileSync(SAVELOCATION+"/score.json", 'utf8')).highscore;
  });
});
