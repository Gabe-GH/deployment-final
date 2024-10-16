"use server";

import Pagination from "./pagination";
import cars from "@/app/data/2024.json";

const Table = () => {
  return (
    <>
      <div className="flex w-full overflow-x-auto">
        <table className="table-hover table">
          <thead>
            <tr>
              <th>#</th>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Images</th>
            </tr>
          </thead>
          <tbody>
            {cars.slice(0, 5).map((car, index) => {
              return (
                <tr>
                  <th>{index}</th>
                  <td>{car.make}</td>
                  <td>{car.model}</td>
                  <td>{car.year}</td>
                  <td>Picture</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-8">
        <Pagination />
      </div>
    </>
  );
};

const Row = (props: any) => {
  return (
    <tr>
      <th>{props.id}</th>
      <td>{props.make}</td>
      <td>{props.model}</td>
      <td>{props.year}</td>
      <td>Images</td>
    </tr>
  );
};

const RenderCars = () => {
  return cars.slice(0, 5).map((car, index) => {
    <Row
      key={index}
      id={index}
      make={car.make}
      model={car.model}
      year={car.year}
    />;
  });
};

export default Table;
