"use client";
import React, { useCallback } from "react";
import Announcement from "./announcement";

function AnnouncementView() {
  const handleAnnouncementClick = useCallback((variant: string) => {
    console.log(`${variant} announcement clicked!`);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center font-sans space-y-6 p-4">
  
      <div className="flex flex-wrap gap-4 justify-center">
        <Announcement
          variant="default"
          onClick={() => handleAnnouncementClick("Default")}
        >
          New feature added
        </Announcement>

        <Announcement
          variant="success"
          onClick={() => handleAnnouncementClick("Success")}
        >
          Update successful
        </Announcement>

        <Announcement
          variant="error"
          onClick={() => handleAnnouncementClick("Error")}
        >
          Action failed
        </Announcement>

        <Announcement
          variant="warning"
          onClick={() => handleAnnouncementClick("Warning")}
        >
          Please check input
        </Announcement>

        <Announcement
          variant="info"
          onClick={() => handleAnnouncementClick("Info")}
        >
          For your information
        </Announcement>

        <Announcement
          variant="gradient"
          onClick={() => handleAnnouncementClick("Gradient")}
        >
          Announcing Gradients!
        </Announcement>

        <Announcement variant="default" disabled>
          Disabled state
        </Announcement>
      </div>
    </div>
  );
}

export default AnnouncementView;
