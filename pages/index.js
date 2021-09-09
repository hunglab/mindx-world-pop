import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import {
    Fragment,
    useState,
    useEffect,
    useContext,
    useRef,
    useLayoutEffect,
} from "react";
import {
    makeStyles,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Paper,
    Typography,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function Home() {
    const APIKEY = "ed74e2be46msha0be35e5f345febp17ac10jsn4262a33cbe07";

    // UseState
    const [showCurrentWorldPop, setShowCurrentWorldPop] = useState("");
    const [show20CountriesPop, setShow20CountriesPop] = useState("");
    const [showAllCountries, setShowAllCountries] = useState("");

    function createData(ctr_name, ctr_pop, ctr_rank) {
        return { ctr_name, ctr_pop, ctr_rank };
    }

    const rows = [];

    useEffect(() => {
        console.log("firstload");
        getCurrentWorldPop();
        getAllCountriesName();
        get20LargestCountriesPop();
        getPop();
    }, []);

    function getCurrentWorldPop() {
        const options = {
            method: "GET",
            url: "https://world-population.p.rapidapi.com/worldpopulation",
            headers: {
                "x-rapidapi-host": "world-population.p.rapidapi.com",
                "x-rapidapi-key": APIKEY,
            },
        };
        axios
            .request(options)
            .then(function (response) {
                // console.log("World: ");
                // console.log(response.data);
                setShowCurrentWorldPop(response.data.body.world_population);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    function getAllCountriesName() {
        const countriesArr = [];
        const options = {
            method: "GET",
            url: "https://world-population.p.rapidapi.com/allcountriesname",
            headers: {
                "x-rapidapi-host": "world-population.p.rapidapi.com",
                "x-rapidapi-key": APIKEY,
            },
        };

        axios
            .request(options)
            .then(function (response) {
                console.log("Countries: ");
                console.log(response.data);
                for (let i = 0; i < 234; i++) {
                    getPop(response.data.body.countries[i]);
                }
                rows.push[getPop];
                setShowAllCountries(rows.push[getPop]);
                return rows;
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    function get20LargestCountriesPop() {
        const countriesArr = [];
        const options = {
            method: "GET",
            url: "https://world-population.p.rapidapi.com/allcountriesname",
            headers: {
                "x-rapidapi-host": "world-population.p.rapidapi.com",
                "x-rapidapi-key": APIKEY,
            },
        };

        axios
            .request(options)
            .then(function (response) {
                console.log("20LargestCountriesPop: ");
                for (let i = 0; i < 20; i++) {
                    // console.log(response.data.body.countries[i]);
                    countriesArr.push(response.data.body.countries[i]);
                    countriesArr.push(" - ");
                }
                // console.log(countriesArr);
                setShow20CountriesPop(countriesArr);
                return countriesArr;
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    function getPop(countryName) {
        var options = {
            method: "GET",
            url: "https://world-population.p.rapidapi.com/population",
            params: { country_name: countryName },
            headers: {
                "x-rapidapi-host": "world-population.p.rapidapi.com",
                "x-rapidapi-key": APIKEY,
            },
        };

        axios
            .request(options)
            .then(function (response) {
                console.log("Population: ");
                console.log(response.data);
                createData(
                    response.data.body.country_name,
                    response.data.body.population,
                    response.data.body.ranking
                );
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    const classes = useStyles();
    return (
        <div className={styles.container}>
            <Head>
                <title>Mindx World Pop</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    {/* Welcome to <a href="https://nextjs.org">Next.js!</a> */}
                </h1>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography variant="p" component="p">
                            Current World Population: {showCurrentWorldPop}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="p" component="p">
                            Top 20 Largest Countries By Population:{" "}
                            {show20CountriesPop}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="p" component="p">
                            POPULATION ALL COUNTRIES
                        </Typography>
                    </Grid>
                    <TableContainer component={Paper}>
                        <Table
                            className={classes.table}
                            aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Country name</TableCell>
                                    <TableCell align="right">
                                        Population
                                    </TableCell>
                                    <TableCell align="right">Ranking</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {row.ctr_name}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.ctr_pop}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.ctr_rank}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </main>

            <footer className={styles.footer}></footer>
        </div>
    );
}
