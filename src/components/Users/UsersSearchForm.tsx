import React, { FC, useEffect } from "react";
import { useFormik } from "formik";
import { FilterType, resetFilters } from "../../redux/usersReducer";
import mStyle from './Users.module.css'
import { useDispatch, useSelector } from "react-redux";
import { getUsersFilter } from "../../redux/usersSelectors";

type FriendPropsType = 'null' | 'true' | 'false'

type FormType = {
   term: string,
   friend: FriendPropsType
}

const UserSearchForm: FC<OwnPropsType> = React.memo((props) => {
   
   const submitForm = (formData: FormType) => {
      const Data = {
         term: formData.term,
         friend: formData.friend === 'null' ? null : formData.friend === 'true' ? true : false
      }
      props.onFilterChanged(Data)
   }
   const dispatch = useDispatch()
   const filter = useSelector(getUsersFilter)

   useEffect(()=> {
      return () => {
      dispatch(resetFilters())
   }
   }, [])

   let formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         term: filter.term,
         friend: String(filter.friend) as FriendPropsType 
      },
      onSubmit: submitForm
   }
   )

   return <div className={mStyle.form}>
            <form onSubmit={formik.handleSubmit}>
               <input type={'text'} name={'term'} placeholder={'Enter login user'} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.term} className={mStyle.input} />
               <select name={'friend'} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.friend} className={mStyle.select}>
                  <option value='null'>All</option>
                  <option value='true'>Only followed</option>
                  <option value='false'>Only unfollowed</option>
               </select>
               <button type={'submit'} className={mStyle.searchButton}>Search</button>
            </form>
   </div>
})

// const UserSearchForm = withFormik<OwnPropsType, FormType, {}>(
//    {
//       enableReinitialize: true,
//       mapPropsToValues: () => (
//          {
//             term: filter.term,
//             friend: String(filter.friend) as FriendPropsType
//          }
//       ),
//       handleSubmit: (formData: FormType, formikBag) => {
//          const Data = {
//             term: formData.term,
//             friend: formData.friend === 'null' ? null : formData.friend === 'true' ? true : false
//          }
//          formikBag.props.onFilterChanged(Data)
//       },
//       displayName: 'searchUserForName'
//    })(UserSearch)

export default UserSearchForm


type OwnPropsType = {
   onFilterChanged: (filter: FilterType) => void
}

