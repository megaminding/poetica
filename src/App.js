import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CharacterCard from "./CharacterCard";
import characters from "./protagonists.json";
import { useState } from "react";
import TextField from "@mui/material/TextField";
// import "../style.css";
import "./style.css";
// import askopenai from "./CharacterCard";

function App() {
  // state variable to store the click count!
  const [count, setCounter] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [prePoem, postPoem] = useState("");
  const [array, moveArray] = useState("");
  const [nums, newNums] = useState(0);
  const [logo, updateLogo] = useState("newlogo.png");
  var list = [
    "minimalist.png",
    "poem.png",
    "greenwatercolor.png",
    "bluemodern.png",
    "orangebirthday.png",
    "vintage.png",
  ];
  // var nums = 0;

  return (
    <div className="App">
      <CssBaseline />
      <span className="left">
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: "1px solid lightgray" }}
        >
          {/* <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Characters Inc
            </Typography>
          </Toolbar> */}
        </AppBar>
        <Container maxWidth="md" sx={{ my: 4 }}>
          <img src={logo} width="700px"></img>
          <Typography
            variant="h2"
            align="center"
            color="text.primary"
            sx={{ py: 2 }}
          ></Typography>
          <TextField
            fullWidth
            width="1000px"
            label="Write me a poem about..."
            id="fullWidth"
            value={searchText}
            onChange={(event) => {
              var newValue = event.target.value;
              setSearchText(newValue);
              // console.log("search", newValue);
            }}
          />

          <Button
            href="#"
            left="50%"
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
            onClick={() => {
              console.log(searchText);
              // var userPrompt = prompt(
              //   "Who do you want to write a poem about? Describe them"
              // );

              // var userPrompt = document.getElementById("fullWidth").innerHTML;

              // console.log(document.getElementById("fullWidth").innerHTML);
              // console.log("Hello " + userPrompt + "!");

              var myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");
              myHeaders.append(
                "Authorization",
                "Bearer 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"
              );

              var raw = JSON.stringify({
                model: "text-davinci-003",
                prompt: ["Write me a poem about..." + searchText],
                //prompt: newValue,
                max_tokens: 200,
                temperature: 0,
                top_p: 1,
                n: 1,
                stream: false,
                logprobs: null,
              });

              var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
              };

              fetch("https://api.openai.com/v1/completions", requestOptions)
                .then((response) => response.json())
                // .then((result) => console.log(result.choices[0].text))
                // .then(
                //   (result) =>
                //     (document.getElementById("input").innerHTML =
                //       result.choices[0].text)
                // )
                // .then((result) => console.log(result.choices[0].text))
                .then((result) => postPoem(result.choices[0].text))

                .catch((error) => console.log("error", error));

              // updateLogo("");
              newNums(0);
              moveArray(list[nums]);
              newNums(nums + 1);
            }}
          >
            Submit
          </Button>
        </Container>

        <div class="container">
          {/* <img src={logo} width="700px"></img> */}
          {/* <div style="background-color: yellow; width:50%; height: 550px; float:left;">   */}
          <img src={array} width="800"></img>
          <div className="centered">
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              sx={{
                mx: 10,
                fontSize: "25px",
                fontFamily: "Playfair Display, serif",
              }}
              id="input"
            >
              {prePoem}
            </Typography>
          </div>
        </div>
        {/* </span> */}
        <Button
          href="#"
          variant="outlined"
          sx={{ my: 1, mx: 1.5 }}
          onClick={() => {
            moveArray(list[nums % 6]);
            newNums(nums + 1);
          }}
        >
          Change Background
        </Button>
      </span>
      {/* End hero unit */}
      <Container maxWidth="lg">
        <Grid
          container
          spacing={5}
          justifyContent="center"
          alignItems="flex-start"
        >
          {characters.map((character) => (
            <Grid item xs={12} md={4} key={character.title}>
              <CharacterCard
                characterName={character.title}
                image={character.pic}
                descriptionArray={character.description}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
