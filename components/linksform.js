import styles from "../styles/form.module.css";
import LinkCard from "./linkcard";
import { useStateValue } from "./context/state";
import { useState } from "react";

const endpoint =
  process.env.NODE_ENV === "production" ? `` : "http://localhost:3000";

const LinksForm = ({ pagedataid }) => {
  // console.log(data);
  const [{ links }, dispatch] = useStateValue();
  const [loading, setloading] = useState(false);

  const addNewLink = () => {
    // console.log(links.length);
    // console.log(links[links.length - 1]);

    let newLink = links[links.length - 1];

    if (newLink && !newLink.hasOwnProperty("id")) {
      // console.log("new link on arr");
      return;
    }
    dispatch({
      type: "updateLink",
      linkdata: [
        ...links,
        {
          linkUrl: "",
          displayText: "",
          pagedataid: pagedataid,
          bgColor: "#2c6bed",
          active: true,
        },
      ],
    });
  };

  const saveLinkData = async (linkdata) => {
    console.log("save linkdata");
    console.log(linkdata);
    setloading(true);
    // setshowAlert({
    //   msg: "",
    //   type: "",
    // });

    let operation = "insertpagelinks";
    if (linkdata.hasOwnProperty("id")) {
      operation = `updatepagelinks`;
    }
    console.log(operation);
    try {
      let res = await fetch(`${endpoint}/api/${operation}`, {
        method: "POST",
        body: JSON.stringify(linkdata),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      // setshowAlert({
      //   msg:
      //     operation === "insertpagelinks"
      //       ? "Added new page link "
      //       : "Updated page link " + " successfully",
      //   type: "success",
      // });
      console.log(res);
      dispatch({ type: "updateLink", linkdata: res.updatedLinkData });
      // reset(res.updatedLinkData[index]);
    } catch (error) {
      console.log(error);
      // setshowAlert({
      //   msg: operation + "failed" + error.message,
      //   type: "danger",
      // });
    }
    setloading(false);
  };

  const deleteLink = async (id) => {
    console.log("delete link");
    console.log(id);
    setloading(true);
    // setshowAlert({
    //   msg: "",
    //   type: "",
    // });

    let operation = "deletepagelink";
    // if (linkdata.hasOwnProperty("id")) {
    //   operation = `updatepagelinks`;
    // }
    console.log(operation);
    try {
      let res = await fetch(`${endpoint}/api/${operation}`, {
        method: "POST",
        body: JSON.stringify({ id: id }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      // setshowAlert({
      //   msg:
      //     operation === "insertpagelinks"
      //       ? "Added new page link "
      //       : "Updated page link " + " successfully",
      //   type: "success",
      // });
      console.log(res);
      // reset();
      if (res.success !== true) {
        throw new Error("Error deleting link " + id);
      }
      dispatch({ type: "deleteLink", id: id });
      // console.warn("reSETTTTTTTTTTTTT");
      // console.log(item);
      // reset({});
    } catch (error) {
      console.log(error);
      // setshowAlert({
      //   msg: operation + "failed" + error.message,
      //   type: "danger",
      // });
    }
    setloading(false);
  };

  return (
    <>
      <div className={styles.Wrapper}>
        <div
          className={`${styles.Inner} col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-8 `}
        >
          <h3>Link Data</h3>
          {loading && (
            <div className="d-grid gap-2 d-md-flex justify-content-end">
              <span
                className="spinner-border text-info spinner-border me-1"
                role="status"
                aria-hidden="true"
              ></span>
            </div>
          )}
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={(e) => {
              addNewLink();
            }}
          >
            Add new link
          </button>
          {links &&
            links.map((item, index) => {
              return (
                <LinkCard
                  key={index}
                  item={item}
                  deleteLink={deleteLink}
                  updateLink={saveLinkData}
                  loading={loading}
                />
              );
            })}
        </div>
        <div className="mb-5"></div>
      </div>
    </>
  );
};
export default LinksForm;

/**
     const fieldName = `links[${index}]`;
                return (
                  <div class="card">
                    <div class="card-body">
                      <fieldset name={fieldName} key={fieldName}>
                        <div className="mb-3 small">
                          <label className="form-label">Name {index}</label>
                          <input
                            type="text"
                            className={
                              errors.handlerText
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            placeholder="Enter name"
                            // {...register("name")}
                            {...register(`${fieldName}.name`)}
                          />
                        </div>
                        <div className="mb-3 small">
                          <label className="form-label">Name {index}</label>
                          <input
                            type="text"
                            className={
                              errors.handlerText
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            placeholder="Enter link"
                            // {...register("name")}
                            {...register(`${fieldName}.link`)}
                          />
                        </div>
                      </fieldset>{" "}
                    </div>{" "}
                  </div>
                );
 */
