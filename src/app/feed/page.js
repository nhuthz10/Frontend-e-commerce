"use client";
import Link from "next/link";
import "./feed.scss";
import { formatISODate } from "@/utils/commonUtils";
import { useSelector } from "react-redux";
import PaginatedItems from "@/components/Pagination/Pagination";
import { useEffect } from "react";

function RSSFeed() {
  const feedData = useSelector((state) => state.feed.feedPagination);
  useEffect(() => {
    if (feedData) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [feedData]);

  return (
    <div className="feed-container">
      {feedData?.map((item, index) => (
        <Link className="feed-item" href={item.link} key={index}>
          <div className="feed-info">
            <h2 className="time">{formatISODate(item.isoDate)}</h2>
            <h2 className="title">{item.title}</h2>
            <p className="text">{item.contentSnippet}</p>
          </div>
          <div className="feed-img">
            <img alt="vn-express-img" src={item.enclosure.url}></img>
          </div>
        </Link>
      ))}
      <PaginatedItems type="feed" />
    </div>
  );
}

export default RSSFeed;
