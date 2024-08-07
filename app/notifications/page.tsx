'use client';

import { useState, useEffect } from 'react';
import Header from "../components/Header";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotifiPage() {
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [readed, setReaded] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const hideMessage = localStorage.getItem('hideMsg0722');
    if (hideMessage !== 'true') {
      setShowWelcomeMessage(true);
    }
  }, []);
  useEffect(() => {
    if (readed) {
      fetch('/api/readed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ readed: true }),
      })
      .then(response => response.json())
      .then(data => {
        // Handle the response data if needed
        console.log('Read status updated:', data);
      })
      .catch(error => {
        // Handle the error if needed
        console.error('Error updating read status:', error);
      });
    }
  }, [readed]);

  const handleCloseWelcomeMessage = (dontShowAgain: boolean) => {
    if (dontShowAgain) {
      localStorage.setItem('hideMsg0722', 'true');
      setReaded(true);
      router.refresh();
    }
    setShowWelcomeMessage(false);
  };

  return (
    <>
      <title>Notifications | Mastio</title>

      <Header title="Notifications" />
      
      {showWelcomeMessage && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold">Thank you for using Mastio!</h2>
                {/* <button
                  onClick={() => handleCloseWelcomeMessage(false)}
                  className="text-blue-500 hover:text-blue-700 ml-4 whitespace-nowrap"
                >
                  Mark as read
                </button> */}
              </div>
              <p className="mb-2">
                Dear Mastio User,
              </p>
              <p className="mb-2">
                I hope this letter finds you well and enjoying your experience with Mastio, the Mastodon web client. I wanted to take a moment to express my heartfelt gratitude for your support and for choosing Mastio as your preferred client.
              </p>
              <p className="mb-2">
                One year ago, I developed the basic functionality of Mastio. Initially, I planned to close it down, but seeing users like you find value in it inspired me to continue its development for the sake of our existing users. It brings me immense joy to see how Mastio has positively impacted your Mastodon experience. Your usage and appreciation truly astonish and humble me.
              </p>
              <p className="mb-2">
                Your feedback and encouragement mean the world to me. They remind me why I embarked on this journey in the first place. Knowing that Mastio has resonated with users like you motivates me to continue refining and enhancing the client. I genuinely appreciate any suggestions or ideas you may have to make Mastio even better. Your input is invaluable in shaping the future of this product.
              </p>
              <p className="mb-2">
                Once again, thank you for your support and for being an integral part of the Mastio community. Your enthusiasm and usage have a profound and positive impact on its growth.
                If you have any suggestions or ideas, feel free to reach out via <Link href="mailto:turing175@gmail.com" className='underline'>email</Link>.<br />
                I am truly grateful for your presence and look forward to delivering an even better Mastodon web client experience in the future.
              </p>
              <p className="mb-2">
                With warm regards,<br />
                Creator of Mastio
              </p>
              <p className="mb-2">

              </p>

              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="dontShowAgain"
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleCloseWelcomeMessage(true);
                    }
                  }}
                  className="mr-2"
                />
                <label htmlFor="dontShowAgain">{"Don't show this message again"}</label>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='pb-6'>

      </div>

      {/* <PostFeed server={server} type="local" /> */}
    </>
  );
}