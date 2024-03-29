import React, { useState, useRef, useContext } from "react"
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded"
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded"
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded"
import RestorePageRoundedIcon from "@mui/icons-material/RestorePageRounded"
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded"
// helpers
import useClickOutSide from "../../helpers/clickOutside"
import UserDrive from "../../helpers/userDrive"
// import ManageDb from '../../config/ManageDb'
// import { useMediaQuery } from "react-responsive"

function ContentItem({ title, preview, item, index, active, setItemOptions, url }) {
  const [onContextMenu, setOnContextMenu] = useState(false)
  const { userDrive, setUserDrive } = useContext(UserDrive)
  const menuRef = useRef()

  let activeTemp = userDrive?.isActive,
    currentFile = ""

  useClickOutSide(menuRef, () => {
    if (onContextMenu) setOnContextMenu(false)
  })

  const onDblClick = (e) => {
    console.log("double")
    switch (item?.data?.type) {
      case "folder":
        const current = userDrive?.currentFolder
        current.push(item?.data?.name?.toString())

        setUserDrive({
          ...userDrive,
          currentFolder: current,
          currentFile: "",
        })
        break
      case "file":
        setItemOptions({
          action: "preview",
          payload: {
            file: item,
          },
          name: item?.data?.name,
        })
        break

      default:
        break
    }
  }

  const onClick = (e) => {
    // if the user is using mobile phone, we'll open the folder when 'onclick'
    // if(mobile) {
    //     onDblClick(e)
    //     return
    // }
    if (e.ctrlKey) {
      if (userDrive?.isActive.indexOf(item?.key) !== -1) activeTemp.splice(userDrive?.isActive.indexOf(item?.key), 1)
      else
        activeTemp.push(item?.key)(
          // current file
          activeTemp.length > 1
        )
          ? (currentFile = "Several items selected")
          : (currentFile = title)
      // end current file

      setUserDrive({
        ...userDrive,
        isActive: activeTemp,
        currentFile,
      })
    } else {
      setUserDrive({
        ...userDrive,
        isActive: [item?.key],
        currentFile: title,
      })
    }
  }

  const contextMenu = (e) => {
    e.preventDefault()
    setOnContextMenu(true)
  }

  const handleClick = (e) => {
    switch (e.detail) {
      case 1:
        onClick(e)
        break
      case 2:
        onDblClick(e)
        break
      default:
        break
    }
  }

  return (
    <div className="content_item_wrapper">
      <div className={active ? "content_item active" : "content_item"} onContextMenu={contextMenu} onClick={handleClick}>
        <div className="content_preview">
          <img src={preview} alt={title} />
        </div>
        <span className="content_title">{title}</span>
        {/* check if view is content or trash */}
        {url === "content" ? (
          <div className={onContextMenu ? "content_item_options active" : "content_item_options"} ref={menuRef}>
            <div className="blur">
              <div className="options">
                {activeTemp?.length === 1 && (
                  <div
                    className="options_item"
                    onClick={() => {
                      setItemOptions({
                        action: "rename",
                        payload: {
                          keys: activeTemp,
                        },
                        name: item?.data?.name,
                      })
                      setOnContextMenu(false)
                    }}
                  >
                    <DriveFileRenameOutlineRoundedIcon className="item_icon" />
                    Rename
                  </div>
                )}
                {item?.data.type !== "folder" && activeTemp.length === 1 && (
                  <div
                    className="options_item"
                    onClick={() => {
                      setItemOptions({
                        action: "download",
                        payload: item?.data?.downloadURL,
                        name: item?.data?.name,
                      })
                      setOnContextMenu(false)
                    }}
                  >
                    <DownloadRoundedIcon className="item_icon" />
                    Download
                  </div>
                )}
                <div
                  className="options_item"
                  onClick={() => {
                    setItemOptions({
                      action: "movetotrash",
                      payload: {
                        excluded: true,
                        keys: activeTemp,
                      },
                      name: item?.data?.name,
                    })
                    setOnContextMenu(false)
                  }}
                >
                  <DeleteRoundedIcon className="item_icon" />
                  Move to trash
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={onContextMenu ? "content_item_options active" : "content_item_options"} ref={menuRef}>
            <div className="blur">
              <div className="options">
                <div
                  className="options_item"
                  onClick={() => {
                    setItemOptions({
                      action: "restore",
                      payload: {
                        excluded: false,
                        keys: activeTemp,
                      },
                      name: item?.data?.name,
                    })
                    setOnContextMenu(false)
                  }}
                >
                  <RestorePageRoundedIcon className="item_icon" />
                  Restore
                </div>
                <div
                  className="options_item"
                  onClick={() => {
                    setItemOptions({
                      action: "delete",
                      payload: {
                        keys: activeTemp,
                      },
                      name: item?.data?.name,
                    })
                    setOnContextMenu(false)
                  }}
                >
                  <DeleteForeverRoundedIcon className="item_icon" />
                  Delete
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContentItem
