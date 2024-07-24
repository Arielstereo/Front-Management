"use client";

import CardItems from "@/components/CardItems";
import SkeletonComponent from "@/components/Skeleton";
import useProyectStore from "@/store/ProyectStore";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

const ProyectPage = () => {
  const setProyects = useProyectStore((state) => state.setProyects);
  const proyects = useProyectStore((state) => state.proyects);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [selected, setSelected] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/proyects");
        setProyects(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const data = e.target.value;
    setSearch(data);
  };

  const searchData = (e) => {
    e.preventDefault();
    if (selected) {
      resetFilters();
      const res = proyects.filter((item) =>
        item.title.toLowerCase().includes(search)
      );
      setResult(res);
      setSearch("");
    } else {
      const res = proyects.filter((item) =>
        item.title.toLowerCase().includes(search)
      );
      setResult(res);
      setSearch("");
    }
  };

  const handleSelect = (e) => {
    const { value } = e.target;
    setSelected(value);
  };

  useEffect(() => {
    if (selected) {
      const res = proyects.filter((item) => item.framework === selected);
      setFiltered(res);
    } else {
      setFiltered(proyects);
    }
  }, [selected, proyects]);

  const resetFilters = () => {
    setSearch("");
    setSelected("");
    setResult([]);
    setFiltered(proyects);
  };

  const showData = selected ? filtered : result.length > 0 ? result : proyects;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl text-center text-slate-400 mt-8">My Projects</h1>
      <div className="flex justify-center gap-32 mt-12">
        <Button
          onClick={resetFilters}
          color="primary"
          variant="ghost"
          size="lg"
        >
          Show all
        </Button>
        <div className="w-64">
          <Select
            label="Select framework"
            name="framework"
            selectedKeys={[selected]}
            onChange={handleSelect}
            size="sm"
          >
            <SelectItem key="react">React</SelectItem>
            <SelectItem key="next">Next</SelectItem>
          </Select>
        </div>
        <form onSubmit={searchData} className="w-fit flex gap-1">
          <Input
            value={search}
            onChange={handleChange}
            type="text"
            label="Name project"
            size="sm"
          />
          <Button type="submit" color="primary" size="lg">
            Search
          </Button>
        </form>
      </div>
      <div className="grid grid-cols-3 gap-12 mx-32">
        {loading ? (
          <div className="flex gap-4">
            <SkeletonComponent />
            <SkeletonComponent />
            <SkeletonComponent />
          </div>
        ) : showData.length > 0 ? (
          <CardItems data={showData} />
        ) : (
          <div className="flex justify-center ml-32">
            <span className="text-yellow-400 text-xl font-semibold my-32">
              No projects found
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProyectPage;
