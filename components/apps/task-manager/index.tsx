import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useApp } from "@/stores/use-app";
import { useTaskManager } from "@/stores/use-task-manager";
import { ArrowDownIcon, ArrowUpIcon, ArrowRightIcon } from "lucide-react";
import { useEffect } from "react";

const getTrendIcon = (trend: "up" | "down" | "stable") => {
  switch (trend) {
    case "up":
      return <ArrowUpIcon className="h-4 w-4 text-red-500" />;
    case "down":
      return <ArrowDownIcon className="h-4 w-4 text-green-500" />;
    default:
      return <ArrowRightIcon className="h-4 w-4 text-gray-500" />;
  }
};

export function TaskManagerAppContent() {
  const { processes, updateProcessData, addNewProcesses, removeProcess } =
    useTaskManager();
  const windows = useApp((state) => state.windows); // Get windows from your app store
  const removedWindow = useApp((state) => state.removeWindow); // Get removeWindow function

  useEffect(() => {
    // Update processes when windows change
    addNewProcesses(windows);
  }, [windows, addNewProcesses]);

  // Watch for window removals
  useEffect(() => {
    const unsubscribe = useApp.subscribe((state, prevState) => {
      const removedWindows = prevState.windows.filter(
        (prevWindow) =>
          !state.windows.find((window) => window.id === prevWindow.id),
      );
      removedWindows.forEach((window) => removeProcess(window.id));
    });
    return () => unsubscribe();
  }, [removeProcess]);

  useEffect(() => {
    const interval = setInterval(updateProcessData, 1000);
    return () => clearInterval(interval);
  }, [updateProcessData]);

  return (
    <div className="min-w-full overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>CPU</TableHead>
            <TableHead>Memory</TableHead>
            <TableHead>Disk</TableHead>
            <TableHead>Network</TableHead>
            <TableHead>GPU</TableHead>
            <TableHead>GPU Engine</TableHead>
            <TableHead>Power usage</TableHead>
            <TableHead>Power trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {processes.map((process) => (
            <TableRow key={process.id}>
              <TableCell className="font-medium">{process.title}</TableCell>
              <TableCell>{process.status}</TableCell>
              <TableCell>{process.cpuUsage}%</TableCell>
              <TableCell>{process.memoryUsage.toFixed(1)} MB</TableCell>
              <TableCell>{process.diskUsage} MB/s</TableCell>
              <TableCell>{process.networkUsage.toFixed(1)} Mbps</TableCell>
              <TableCell>{process.gpuUsage}%</TableCell>
              <TableCell>{process.gpuEngine}</TableCell>
              <TableCell>{process.powerUsage}</TableCell>
              <TableCell>{getTrendIcon(process.powerUsageTrend)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
