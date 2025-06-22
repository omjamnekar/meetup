import { useEffect, useState } from "react";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/320px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address 5, 12345 Some City",
//     description: "This is a first meetup!",
//   },
//   {
//     id: "m2",
//     title: "React Developers Gathering",
//     image:
//       "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
//     address: "React Street 10, 54321 React City",
//     description: "Meet other React enthusiasts!",
//   },
//   {
//     id: "m3",
//     title: "JavaScript Conference",
//     image:
//       "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
//     address: "JS Avenue 23, 67890 JS Town",
//     description: "Annual JavaScript conference for all levels.",
//   },
//   {
//     id: "m4",
//     title: "Frontend Masters Meetup",
//     image:
//       "https://images.unsplash.com/photo-1515168833906-d2a3b82b1a48?auto=format&fit=crop&w=400&q=80",
//     address: "Frontend Blvd 7, 11223 Web City",
//     description: "Learn and share frontend skills.",
//   },
//   {
//     id: "m5",
//     title: "Tech Innovators Night",
//     image:
//       "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
//     address: "Innovation Road 1, 33445 Future City",
//     description: "Networking event for tech innovators.",
//   },
//   {
//     id: "m6",
//     title: "Node.js Enthusiasts",
//     image:
//       "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&w=400&q=80",
//     address: "Node Lane 42, 55667 Backend Town",
//     description: "Discuss Node.js and backend development.",
//   },
// ];

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetup</title>
        <meta
          name="description"
          content="Browser a huge of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   // const res= context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

// it is just like initstate for prerandering static page
// rebuild with npm
export async function getStaticProps() {
  // fetch data from an API
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

  const meetups = await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },

    // these will regenerate this page after 10 sec
    revalidate: 10,
  };
}

export default HomePage;
