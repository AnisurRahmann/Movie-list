import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useFilters, useRowSelect, useSortBy, useTable } from "react-table";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addFavoriteMovie } from "../features/movie/movieSlice";

// https://codesandbox.io/s/github/tannerlinsley/react-table/tree/v7/examples/row-selection

// [Note: Anisur @01/02/2020]
// To whom it may concern: There is a lot of ts-ignore on this file. It requires a decent time to fix. If you find one just a quick commit would be much appreciated.

// TODO: [Anisur @01/02/2020]
// A Pagination would be nice to have. Currently we are using scrolling instead of it. Else we can use virtual scroll as well.Check pages/FavoriteMovie.tsx for more info. will require some hacks in that case.

const IndeterminateCheckbox = forwardRef(
  // @ts-ignore
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;
    useEffect(() => {
      // @ts-ignore
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        {/* @ts-ignore */}
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

const Table = ({ columns, data }: any) => {
  const [filterInput, setFilterInput] = useState("");
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // @ts-ignore
    setFilter,
    // @ts-ignore
    selectedFlatRows,
    // @ts-ignore
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          // @ts-ignore
          Header: ({ selectedFlatRows }) => (
            <div>
              <button
                onClick={()=> {
                    let data: any = [];
                    selectedFlatRows.forEach((row: any) => {
                      data.push({
                        movieId: row.original.id,
                        userId: user.id,
                      });
                    });
                    dispatch(addFavoriteMovie(data));
                }}
                className="btn"
                style={{ backgroundColor: "#F17881", borderColor: "white" }}
                disabled={selectedFlatRows.length > 0 ? false : true}
              >
                Add to Favorite
              </button>
            </div>
          ),
          // @ts-ignore
          Cell: ({ row }: any) => {
            for (let u in row.values.users) {
              if (row.values.users[u].userId === user.id) {
                return;
              }
            }

            if (row.values.users.length === 0) {
              return (
                <div>
                  <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                </div>
              );
            }

            return (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            );
          },
        },
        ...columns,
      ]);
    }
  );

  const handleFilterChange = (e: any) => {
    const value = e.target.value || undefined;
    setFilterInput(value);
    setFilter("movieName", value);
  };


  return (
    <>
      <div className="form-group">
        <input
          value={filterInput}
          onChange={handleFilterChange}
          placeholder={"Search name"}
        />
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th
                  // @ts-ignore
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    // @ts-ignore
                    column?.isSorted
                      ? // @ts-ignore
                        column.isSortedDesc
                        ? "sorted-desc"
                        : "sorted-asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: any, i: any) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

const Genres = ({ values }: any) => {
  return (
    <>
      {values.map((genre: any, idx: string) => {
        return (
          <span key={idx} className="badge">
            {genre}
          </span>
        );
      })}
    </>
  );
};

const MovieTable = ({ data }: any) => {
  const { user } = useAppSelector((state) => state.auth);

  const columns = useMemo(
    () => [
      {
        Header: "Movie List",
        columns: [
          {
            Header: "Name",
            accessor: "movieName",
          },
          {
            Header: "Director",
            accessor: "movieDirector",
          },
          {
            Header: "Votes",
            accessor: "movieVotes",
          },
          {
            Header: "Gross",
            accessor: "movieGross",
          },
          {
            Header: "Genre",
            accessor: "movieGenre",
            // @ts-ignore
            Cell: ({ cell: { value } }) => <Genres values={value} />,
          },
          {
            Header: "Favorite",
            accessor: "users",
            // @ts-ignore
            Cell: ({ cell: { value } }) => {
              for (let val in value) {
                if (value[val].userId === user.id) {
                  return <FaHeart color="red" />;
                }
              }
            },
          },
        ],
      },
    ],
    [user.id]
  );

  return (
    <>
      <div className="table-wrapper">
        <Table columns={columns} data={data} />
      </div>
    </>
  );
};

export default MovieTable;
