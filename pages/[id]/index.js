import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
function MeetupDetailPage(props) {
  return (
    <>
      <Head>
        <title>{props.meetUpData.title}</title>
        <meta content={props.meetUpData.description} name="description" />
      </Head>
      <MeetupDetail {...props.meetUpData} />
    </>
  );
}

export async function getStaticPaths() {
  const dbPassword = process.env.PASSWORD;
  if (!dbPassword) {
    res.status(500).json({
      message: "Database password not set in environment variables.",
    });
    return;
  }

  const client = await MongoClient.connect(
    `mongodb+srv://omjjamnekar:${dbPassword}@react-learning.2psxwhb.mongodb.net/meetup?retryWrites=true&w=majority&appName=React-learning`
  );

  const db = client.db();
  const meetupCollection = db.collection("meetup");

  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { id: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;

  const dbPassword = process.env.PASSWORD;
  if (!dbPassword) {
    res.status(500).json({
      message: "Database password not set in environment variables.",
    });
    return;
  }

  const client = await MongoClient.connect(
    `mongodb+srv://omjjamnekar:${dbPassword}@react-learning.2psxwhb.mongodb.net/meetup?retryWrites=true&w=majority&appName=React-learning`
  );

  const db = client.db();
  const meetupCollection = db.collection("meetup");

  const selectedMeetup = await meetupCollection.findOne({
    _id: new ObjectId(id),
  });

  return {
    props: {
      meetUpData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetailPage;
