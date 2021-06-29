// React
import React, { useState, useEffect } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

// Assets
import Logo from "../assets/img/Logo.png";

// Libs
import { useFormik } from "formik";

// Redux
import { connect } from "react-redux";
import { checkLink } from "../store/actions/workers";
import { registerWorker } from "../store/actions/workers";

// Components
import RegisterForm from "../components/new/worker/RegisterForm";
import WorkerContactForm from "../components/new/worker/WorkerContactForm";
import WorkerPersonalForm from "../components/new/worker/WorkerPersonalForm";
import WorkerLegalForm from "../components/new/worker/WorkerLegalForm";
import SuccessfulWorkerRegistartion from "../components/new/worker/SuccessfulWorkerRegistartion";

const NewWorker = ({ match, checkLink, registerWorker }) => {
	const { id } = match.params;
	const [loadingPage, setLoadingPage] = useState(true);
	const [check, setCheck] = useState();
	const [process, setProcess] = useState(1);
	const [uid, setUid] = useState();
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const loadCheck = async () => {
			setLoadingPage(true);
			setCheck(await checkLink(id));
			setLoadingPage(false);
		};
		loadCheck();
	}, [id, checkLink]);

	console.log(check);

	const formik = useFormik({
		initialValues: {
			birthday: null,
			contact: {
				phoneNumber: null,
				location: {
					address: null,
					lat: null,
					lng: null,
				},
			},
			legal: {
				dni: {
					number: null,
					front: null,
					back: null,
					expiryDate: null,
				},
			},
			gender: "",
			images: {
				main: null,
			},
		},
		onSubmit: async (values) => {
			setLoading(true);
			try {
				const reg = await registerWorker({
					workerData: values,
					name: name,
					email: email,
					uid: uid,
					listed: check.id_company,
					categories: check.categories,
					tags: check.tags,
				});
				if (reg) {
					setProcess(5);
				}
			} catch (err) {
				console.log("error:", err);
			} finally {
				setLoading(false);
			}
		},
	});

	const title = () => {
		let msg = `Has sido invitado por ${check.companyName} para `;
		if (check.categories.length > 1) {
			msg += "sus listas de ";
		} else {
			msg += "su lista de ";
		}
		check.categories.forEach((cat) => {
			if (check.categories.indexOf(cat) === 0) {
				msg += `${cat}`;
			} else {
				if (check.categories.indexOf(cat) === check.categories.length - 1) {
					msg += ` y ${cat}`;
				} else {
					msg += `, ${cat}`;
				}
			}
		});
		return msg;
	};

	return (
    <Flex
      display="flex"
      justifyContent="center"
      width={"100vw"}
      px={6}
      mx={"auto"}
    >
      <Flex
        maxW={"400px"}
        w={"100%"}
        mt={8}
        flexDirection="column"
        alignItems="center"
      >
        <Box mb="8">
          <Image src={Logo} alt="Logo de Labora" w="120px" />
        </Box>
        {loadingPage ? (
          <Text>Cargando...</Text>
        ) : check === 404 ? (
          <Text>Enlace incorrecto</Text>
        ) : check === 401 ? (
          <Text>Este enlace ha caducado</Text>
        ) : (
          <Flex flexDirection="column">
            {process === 1 ? (
              <Flex flexDirection="column">
                <Text>{title()}</Text>
                <RegisterForm
                  handleProcess={setProcess}
                  handleUid={setUid}
                  handleName={setName}
                  handleEmail={setEmail}
                  formik={formik}
                />
              </Flex>
            ) : process === 2 ? (
              <WorkerContactForm handleProcess={setProcess} formik={formik} />
            ) : process === 3 ? (
              <WorkerPersonalForm handleProcess={setProcess} formik={formik} />
            ) : process === 4 ? (
              <WorkerLegalForm
                handleProcess={setProcess}
                formik={formik}
                loading={loading}
              />
            ) : process === 5 ? (
              <SuccessfulWorkerRegistartion />
            ) : (
              <Text>Algo salió mal :(</Text>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

const mapDispatchToProps = {
	checkLink,
	registerWorker,
};

export default connect(null, mapDispatchToProps)(NewWorker);
