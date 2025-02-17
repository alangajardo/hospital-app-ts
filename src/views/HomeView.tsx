import { useEffect, useState } from "react"
import MainLayout from "../layouts/MainLayout"
import { getServicios } from "../services/api"
import HospitalInfo from "../components/HospitalInfo"
import ServiceList from "../components/ServiceList"

const HomeView = () => {
    const [servicios, setServicios] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const servicios = await getServicios()
            setServicios(servicios)
        }
        fetchData()
    }, [])

    return (
        <MainLayout>
            <HospitalInfo />
            <ServiceList servicios={servicios}/>
        </MainLayout>
    )    
}

export default HomeView
