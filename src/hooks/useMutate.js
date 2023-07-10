import {useMutation, useQueryClient} from "react-query";
import {useDispatch} from "react-redux";

const useMutate = (action ,queryKey ,disAction) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const mutation = useMutation(action, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(queryKey);
      if(disAction){dispatch(disAction(data))}
    },
  });
  return mutation;
};

export default useMutate;

