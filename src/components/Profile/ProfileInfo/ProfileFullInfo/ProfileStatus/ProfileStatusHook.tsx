import React, { ChangeEvent, FC, useEffect, useState } from "react";

type PropsType = {
    status: string
    isOwner: boolean
    
    updateUserStatus: (newStatus: string) => void
}

const ProfileStatusHook: FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState<boolean>(false);
    let [status, setStatus] = useState<string>(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        if (props.isOwner) {
            setEditMode(true)
            setStatus(props.status)
        }
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateUserStatus(status)
    }

    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value)
    }

    return (
        <div>
            {!editMode &&
                <div>
                    Status: <span onDoubleClick={activateEditMode}>{status || 'No status'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input autoFocus onChange={onStatusChange}
                        onBlur={deactivateEditMode}
                        value={status} />
                </div>
            }
        </div>
    )
}

export default ProfileStatusHook;