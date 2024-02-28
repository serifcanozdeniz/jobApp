import axios from "axios";
import { useEffect } from "react";
import { setLoading, serError, setJobs } from "../redux/slices/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Card from "../components/Card";

const JobList = () => {
  const jobState = useSelector((store) => store.jobReducer);

  const dispatch = useDispatch();

  // api isteği atıp cevabı store a bildirir
  const getJobs = () => {
    // slice'daki yükleniyoru true ya çek
    dispatch(setLoading());
    // api isteği at
    axios
      .get("http://localhost:3001/jobs")
      //   slice daki veriyi güncelle
      .then((res) => dispatch(setJobs(res.data)))
      //   slice daki error u güncelle
      .catch((err) => dispatch(serError(err.message)));
  };

  useEffect(() => {
    getJobs();
  }, []);
  return (
    <div className="list-page">
      {/* 
    1) yüklenme devam ediyorsa ekrana loader bas
    2) yüklenme bittiyse ve hata varsa ekrana hatayı ve tekrar dene butonu bas
    3) yğklenme bittiyse ve hatsa yoksa kartları ekrana bas
    */}

      {jobState.isLoading ? (
        <Loader />
      ) : jobState.error ? (
        <Error text={jobState.error} retry={getJobs} />
      ) : (
        <div className="job-list">
          {jobState.jobs.map((job) => (
            <Card key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
