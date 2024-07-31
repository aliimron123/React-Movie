import { LoadingOutlined } from "@ant-design/icons";
import { Card, Spin } from "antd";
import React from "react";

interface IProps {
  data: any[];
  loading?: boolean;
}
const CardContent = ({ data, loading }: IProps) => {
  return (
    <React.Fragment>
      {loading ? (
        <div className="flex h-[700px] w-full flex-col items-center justify-center gap-4 rounded-md">
          <Spin indicator={<LoadingOutlined spin />} size="large" tip="Loading.." />
          <p className="text-blue-700">Loading...</p>
        </div>
      ) : (
        <div className="rounded-md text-center">
          {data.length > 0 ? (
            <div className="mx-auto grid h-full w-fit gap-8 sm:mx-auto sm:grid-cols-1 md:grid-cols-2 xl:mx-0 xl:grid-cols-4">
              {data.map((val) => (
                <Card
                  hoverable
                  style={{ width: 295 }}
                  key={val.imdbID}
                  cover={
                    <img
                      src={
                        val.Poster && val.Poster !== "N/A"
                          ? val.Poster
                          : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                      }
                      alt={val.Title}
                    />
                  }
                >
                  <h1>{val.Title}</h1>
                  <p>{val.Year}</p>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex h-[700px] w-full flex-col items-center justify-center gap-3 rounded-md bg-white text-center shadow-md">
              <h1 className="text-2xl font-medium">Welcome To Movie Finder</h1>
              <p>Find your favorite movie, game, or series</p>
              <p className="text-md">{"Your Data Not Show :("}</p>
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default CardContent;
